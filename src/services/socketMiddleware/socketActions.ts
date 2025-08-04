import { createAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../burger-ingredients/slice";

export interface OrderCardPositions {
  id: number
  number: number;
  name: string;
  status: string;
  createdAt: string;
  ingredients: BurgerIngredient[];
  price: number;
}

export type TWsOrder = {
  _id: string;
  number: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  name: string;
  status: "done" | "pending" | "created";
};

export type TWsMessage = {
  success: boolean;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
};

export interface WsOrdersState {
  connected: boolean;
  ordersInfo : TWsMessage;
  orderCardPositionsList: OrderCardPositions[];
  error: string | null;
}

export const wsConnect = createAction<string>("ws/connect");
export const wsDisconnect = createAction("ws/disconnect");
export const wsSendMessage = createAction<any>("ws/sendMessage");

export const wsOnConnected = createAction<Event>("ws/onConnected");
export const wsOnDisconnected = createAction<CloseEvent>("ws/onDisconnected");
export const wsOnMessageReceived = createAction<TWsMessage>("ws/onMessageReceived");
export const wsOnError = createAction<Event>("ws/onError");

export const twsConnect = createAction<string>("tws/connect");
export const twsDisconnect = createAction("tws/disconnect");
export const twsSendMessage = createAction<any>("tws/sendMessage");

export const twsOnConnected = createAction<Event>("tws/onConnected");
export const twsOnDisconnected = createAction<CloseEvent>("tws/onDisconnected");
export const twsOnMessageReceived = createAction<TWsMessage>("tws/onMessageReceived");
export const twsOnError = createAction<Event>("tws/onError");

