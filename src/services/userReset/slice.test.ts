import { userResetSlice } from "./slice";

describe("user-reset slice", () => {
  const reducer = userResetSlice.reducer;

  it("should return the initial state when passed an empty action", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).toEqual({
      isForgotPasswordCompleted: false,
      isLoading: false,
      error: null,
      userReset: null,
    });
  });
});
