import { AsyncThunk, Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserState } from "../services/userAuth/slice";

export function saveTokensInCookie(tokens: {accessToken: string, refreshToken: string}): void {
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    Cookies.set("accessToken", tokens.accessToken.replace("Bearer ", ""), {expires: 1 / 72}); // 20 minutes
    Cookies.set("refreshToken", tokens.refreshToken, {expires: 365});
    console.log("accessToken -> ", tokens.accessToken.replace("Bearer ", ""));
    console.log("refreshToken -> ", tokens.refreshToken);
  } else {
    console.error("Invalid tokens provided");
  }
}

export function getBearerAccessTokenFromCookie(): string {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    return "Bearer " + accessToken;
  } else {
    throw new Error("No accessToken token");
  }
}

export type FuncRefreshAuth = () => UserState;

export type FuncWhickNeedAuth = (value: any) => any;

export async function retryIfAuthTokenNotFound(dispatch: Dispatch<any>, funcRefreshAuth: AsyncThunk<UserState, void, any>, funcWhickNeedAuth: FuncWhickNeedAuth, params: any = undefined){
 try {
      console.log("Starting function that requires authentication...");
      await dispatch(funcWhickNeedAuth(params));
      console.log("Function executed successfully.");
    } catch (error) {
      if (error instanceof Error && error.message === "No accessToken token") {
        console.warn("Access token not found, trying to refresh...");
        try {
          console.log("Refreshing authentication tokens...");
          await dispatch(funcRefreshAuth());
          console.log("Tokens refreshed successfully, retrying the function...");
          await dispatch(funcWhickNeedAuth(params));
          console.log("Function retried successfully after refreshing tokens.");
        } catch (refreshError) {
          console.error("Failed to refresh tokens:", refreshError);
          throw refreshError;
        }
      } else {
        throw error;
      }
    }
}