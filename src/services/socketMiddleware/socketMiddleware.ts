import {
  type ActionCreatorWithoutPayload,
  type ActionCreatorWithPayload,
  type Middleware,
  type MiddlewareAPI,
  type UnknownAction,
} from '@reduxjs/toolkit';

import { RootState, AppDispatch } from '../index';
import { refreshToken } from '../userAuth/thunks';

export type WebSocketActions<TMessage> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage: ActionCreatorWithPayload<TMessage>;
  onConnected: ActionCreatorWithPayload<Event>;
  onDisconnected: ActionCreatorWithPayload<CloseEvent>;
  onMessageReceived: ActionCreatorWithPayload<TMessage>;
  onError: ActionCreatorWithPayload<Event>;
};

export type WebSocketOptions = {
  withTokenRefresh: boolean;
};

export function createWebSocketMiddleware<TMessage>(
  {
    connect,
    disconnect,
    sendMessage,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError,
  }: WebSocketActions<TMessage>,
  { withTokenRefresh }: WebSocketOptions
): Middleware {
  let socket: WebSocket | null = null;
  let isConnected = false;
  let reconnectTimer = 0;
  let url: string;

  return ((store: MiddlewareAPI<AppDispatch, RootState>) =>
    (next: AppDispatch) =>
    (action: UnknownAction) => {
      if (connect.match(action)) {
        if (socket !== null) {
          console.warn('WebSocket is already connected.');
          return;
        }

        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;

        socket.onopen = event => {
          store.dispatch(onConnected(event));
        };

        socket.onclose = event => {
          store.dispatch(onDisconnected(event));
          socket = null;

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              store.dispatch(connect(url));
            }, 3000);
          }
        };

        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          store.dispatch(onMessageReceived(data));

          if (withTokenRefresh && data.message === 'Invalid or missing token') {
            const refreshAction = refreshToken();
            const result = store.dispatch(refreshAction);

            if (typeof (result as any).then === 'function') {
              (result as any).then((refreshData: any) => {
                if (refreshData?.payload?.accessToken) {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set('token', refreshData.payload.accessToken.replace('Bearer ', ''));

                  store.dispatch(disconnect());
                  store.dispatch(connect(wssUrl.toString()));
                } else {
                  console.error('Token refresh failed: No access token in payload');
                  store.dispatch(disconnect());
                }
              }).catch((error: any) => {
                console.error('Token refresh error:', error);
                store.dispatch(disconnect());
              });
            }
          }
        };

        socket.onerror = event => {
          store.dispatch(onError(event));
        };

        console.log('WebSocket connected to:', url);
      }

      if (disconnect.match(action)) {
        if (socket !== null) {
          socket.close();
        }

        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket = null;
        console.log('WebSocket disconnected');
      }

      if (sendMessage.match(action)) {
        if (socket !== null && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        } else {
          console.warn('WebSocket is not open. Cannot send message.');
        }
      }

      return next(action);
    }) as Middleware;
}
