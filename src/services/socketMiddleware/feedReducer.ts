import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { OrderCardPositions, TWsMessage, WsOrdersState } from "./socketActions";
import {
  wsOnConnected,
  wsOnDisconnected,
  wsOnMessageReceived,
  wsOnError,
} from "./socketActions";

export const initialState: WsOrdersState = {
  connected: false,
  ordersInfo: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  orderCardPositionsList: [],
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeedOrderCardPositing: (
      state,
      action: PayloadAction<OrderCardPositions>
    ) => {
      state.orderCardPositionsList.push(action.payload);
    },
    removeFeedOrderCardPosition: (state, action: PayloadAction<number>) => {
      state.orderCardPositionsList = state.orderCardPositionsList.filter(
        (orderCard: OrderCardPositions) => orderCard.id !== action.payload
      );
    },
    clearOrderCardPositionList: (state) => {
      state.orderCardPositionsList = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(wsOnConnected, (state) => {
        state.connected = true;
        state.error = null;
      })
      .addCase(wsOnDisconnected, (state) => {
        state.connected = false;
      })
      .addCase(
        wsOnMessageReceived,
        (state, action: PayloadAction<TWsMessage>) => {
          state.ordersInfo.orders = action.payload.orders;
          state.ordersInfo.total = action.payload.total;
          state.ordersInfo.totalToday = action.payload.totalToday;
        }
      )
      .addCase(wsOnError, (state, action: PayloadAction<Event>) => {
        state.error = action.payload.type;
      });
  },
});

export const { addFeedOrderCardPositing, removeFeedOrderCardPosition } =
  feedSlice.actions;

export default feedSlice.reducer;
