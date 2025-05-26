import { BASE_URL } from "../../Constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/checkResponse";
import { UserResetState } from "./slice";

export type SendResetEmail = {
  email: string;
};

export const sendResetEmail = createAsyncThunk<UserResetState, SendResetEmail>(
  "userReset/sendResetEmail",
  async (registerUser) => {
    const response = await fetch(BASE_URL + "/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUser),
    });

    const json = await checkResponse(response);
    return json as UserResetState;
  }
);

export type ResetPassword = {
  password: string;
  token: string; // This is the token received in the email
};

export const resetPassword = createAsyncThunk<UserResetState, ResetPassword>(
  "userReset/loginUser",
  async (resetPassword) => {
    const response = await fetch(BASE_URL + "/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetPassword)
    });

    const json = await checkResponse(response);
    return json as UserResetState;
  }
);


