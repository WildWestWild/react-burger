import { BASE_URL } from "../../Constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/checkResponse";
import { UserState } from "./slice";
import Cookie from "js-cookie";
import { saveTokensInCookie } from "../../utils/tokens";

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
    saveTokensInCookie(json);
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
    saveTokensInCookie(json);
    return json as UserState;
  }
);

export const logoutUser = createAsyncThunk<UserState>(
  "user/logoutUser",
  async () => {
    let token = Cookie.get("refreshToken");
    if (!token) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(BASE_URL + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "refreshToken": token }),
    });

    const json = await checkResponse(response);

    if (json.success) {
      Cookie.remove("accessToken");
      Cookie.remove("refreshToken");
      return {
        isLoading: false,
        error: null,
        accessToken: "",
        refreshToken: "",
        user: null,
      } as UserState;
    } else {
      throw new Error("Logout failed");
    }
  }
);
