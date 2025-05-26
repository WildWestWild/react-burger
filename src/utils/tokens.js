import Cookies from "js-cookie";

export function saveTokensInCookie(tokens) {
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    Cookies.set("accessToken", tokens.accessToken.replace("Bearer ", ""), {expires: 1 / 72}); // 20 minutes
    Cookies.set("refreshToken", tokens.refreshToken, {expires: 365});
    console.log("accessToken -> ", tokens.accessToken.replace("Bearer ", ""));
    console.log("refreshToken -> ", tokens.refreshToken);
  } else {
    console.error("Invalid tokens provided");
  }
}

export function getAccessTokenFromCookie() {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    return accessToken;
  } else {
    console.error("Access token not found in cookies");
    return null;
  }
}