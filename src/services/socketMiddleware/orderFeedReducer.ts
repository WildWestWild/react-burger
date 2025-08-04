import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  OrderCardPositions,
  TWsMessage,
  WsOrdersState,
} from "./socketActions";
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
  orderCardPositionsList: [],
};

export const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {
    addProfileOrderCardPosition: (
      state,
      action: PayloadAction<OrderCardPositions>
    ) => {
      state.orderCardPositionsList.push(action.payload);
    },
    removeProfileOrderCardPosition: (state, action: PayloadAction<number>) => {
      state.orderCardPositionsList = state.orderCardPositionsList.filter(
        (orderCard: OrderCardPositions) => orderCard.id !== action.payload
      );
    },
    clearProfileOrderCardPositionList: (state) => {
      state.orderCardPositionsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(twsOnConnected, (state) => {
        state.connected = true;
        state.error = null;
      })
      .addCase(twsOnDisconnected, (state) => {
        state.connected = false;
      })
      .addCase(
        twsOnMessageReceived,
        (state, action: PayloadAction<TWsMessage>) => {
          state.ordersInfo.orders = action.payload.orders;
          state.ordersInfo.total = action.payload.total;
          state.ordersInfo.totalToday = action.payload.totalToday;
        }
      )
      .addCase(twsOnError, (state, action: PayloadAction<Event>) => {
        state.error = action.payload.type;
      });
  },
});

export const {
  addProfileOrderCardPosition,
  removeProfileOrderCardPosition,
  clearProfileOrderCardPositionList,
} = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
