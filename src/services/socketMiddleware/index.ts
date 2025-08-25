import { createWebSocketMiddleware } from "./socketMiddleware";
import * as wsActions from "./socketActions";

export const wsOrdersMiddleware = createWebSocketMiddleware(
  {
    connect: wsActions.wsConnect,
    disconnect: wsActions.wsDisconnect,
    sendMessage: wsActions.wsSendMessage,
    onConnected: wsActions.wsOnConnected,
    onDisconnected: wsActions.wsOnDisconnected,
    onMessageReceived: wsActions.wsOnMessageReceived,
    onError: wsActions.wsOnError,
  },
  { withTokenRefresh: false }
);

export const wsTOrdersMiddleware = createWebSocketMiddleware(
  {
    connect: wsActions.twsConnect,
    disconnect: wsActions.twsDisconnect,
    sendMessage: wsActions.twsSendMessage,
    onConnected: wsActions.twsOnConnected,
    onDisconnected: wsActions.twsOnDisconnected,
    onMessageReceived: wsActions.twsOnMessageReceived,
    onError: wsActions.twsOnError,
  },
  { withTokenRefresh: true }
);
