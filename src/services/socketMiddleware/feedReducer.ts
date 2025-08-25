import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  TWsMessage,
  WsOrdersState,
} from "./socketActions";
import {
  wsOnConnected,
  wsOnDisconnected,
  wsOnMessageReceived,
  wsOnError,
} from "./socketActions";
import { BurgerIngredient } from "../burger-ingredients/slice";

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
    createFeedOrderCardPositions: (
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
    },
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

export const { createFeedOrderCardPositions} = feedSlice.actions;

export default feedSlice.reducer;
