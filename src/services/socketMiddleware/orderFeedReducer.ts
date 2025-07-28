import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TWsMessage, WsOrdersState } from "./socketActions";
import {
  twsOnConnected,
  twsOnDisconnected,
  twsOnMessageReceived,
  twsOnError,
} from "./socketActions";

const initialState: WsOrdersState = {
  connected: false,
    ordersInfo: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
  error: null,
};

export const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(twsOnConnected, (state) => {
        state.connected = true;
        state.error = null;
      })
      .addCase(twsOnDisconnected, (state) => {
        state.connected = false;
      })
      .addCase(twsOnMessageReceived, (state, action: PayloadAction<TWsMessage>) => {
        state.ordersInfo.orders = action.payload.orders;
        state.ordersInfo.total = action.payload.total;
        state.ordersInfo.totalToday = action.payload.totalToday;
      })
      .addCase(twsOnError, (state, action: PayloadAction<Event>) => {
        state.error = action.payload.type;
      });
  },
});

export default orderFeedSlice.reducer;
