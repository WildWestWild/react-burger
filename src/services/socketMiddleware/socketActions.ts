import { orderDetailsSlice } from './../order-details/slice';
import { createAction } from "@reduxjs/toolkit";

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

export const wsConnect = createAction<string>("ws/connect");
export const wsDisconnect = createAction("ws/disconnect");
export const wsSendMessage = createAction<any>("ws/sendMessage");

export const wsOnConnected = createAction<Event>("ws/onConnected");
export const wsOnDisconnected = createAction<CloseEvent>("ws/onDisconnected");
export const wsOnMessageReceived = createAction<TWsMessage>("ws/onMessageReceived");
export const wsOnError = createAction<Event>("ws/onError");
