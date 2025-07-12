import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TWsMessage } from "./socketActions";
import {
  wsOnConnected,
  wsOnDisconnected,
  wsOnMessageReceived,
  wsOnError,
} from "./socketActions";

interface WsOrdersState {
  connected: boolean;
  ordersInfo : TWsMessage;
  error: string | null;
}

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

export const wsOrdersSlice = createSlice({
  name: "wsOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsOnConnected, (state) => {
        state.connected = true;
        state.error = null;
      })
      .addCase(wsOnDisconnected, (state) => {
        state.connected = false;
      })
      .addCase(wsOnMessageReceived, (state, action: PayloadAction<TWsMessage>) => {
        state.ordersInfo.orders = action.payload.orders;
        state.ordersInfo.total = action.payload.total;
        state.ordersInfo.totalToday = action.payload.totalToday;
      })
      .addCase(wsOnError, (state, action: PayloadAction<Event>) => {
        state.error = action.payload.type;
      });
  },
});

export default wsOrdersSlice.reducer;
