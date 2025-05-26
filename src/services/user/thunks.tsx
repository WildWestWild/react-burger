import { BASE_URL } from "../../Constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/checkResponse";
import { UserState } from "./slice";

export type RegisterUser = {
  email: string;
  password: string;
  name: string;
};

export const registrationUser = createAsyncThunk<UserState, RegisterUser>(
  "user/registrationUser",
  async (registerUser) => {
    const response = await fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUser),
    });

    const json = await checkResponse(response);

    return json as UserState;
  }
);

export type LoginUser = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk<UserState, LoginUser>(
  "user/loginUser",
  async (loginUser) => {
    const response = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    });

    const json = await checkResponse(response);

    return json as UserState;
  }
);
