import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  TWsMessage,
  WsOrdersState,
} from "./socketActions";
import {
  twsOnConnected,
  twsOnDisconnected,
  twsOnMessageReceived,
  twsOnError,
} from "./socketActions";
import { BurgerIngredient } from "../burger-ingredients/slice";

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
    createProfileOrderCardPositions: (
      state,
      action: PayloadAction<BurgerIngredient[]>
    ) => {
      state.orderCardPositionsList = state.ordersInfo.orders.map((order) => ({
        number: order.number,
        name: order.name,
        status: order.status as string,
        createdAt: order.createdAt,
        ingredients: order.ingredients.map(
          (id) => action.payload.find((item) => item._id === id)!
        ),
        price: order.ingredients.reduce(
          (total, id) =>
            total +
            (action.payload.find((item) => item._id === id)?.price || 0),
          0
        ),
        isUserProfile: false,
      }));
    }
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
  createProfileOrderCardPositions
} = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
