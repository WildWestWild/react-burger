import { userSlice, initialState } from "./slice";


describe('user-auth slice', ()=> {
    const reducer = userSlice.reducer;

    it("should return the initial state when passed an empty action", () => {
        const emptyAction = { type: "" };
        const state = reducer(undefined, emptyAction);
        expect(state).toEqual(initialState);
      });
});