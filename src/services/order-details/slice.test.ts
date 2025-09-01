import { orderDetailsSlice, initialState, clearOrderDetails, OrderDetailsState } from "./slice";


describe('order-details slice', ()=> {
    const reducer = orderDetailsSlice.reducer;

    it("should return the initial state when passed an empty action", () => {
        const emptyAction = { type: "" };
        const state = reducer(undefined, emptyAction);
        expect(state).toEqual(initialState);
      });

    it('should clear state', () => {
        const testState: OrderDetailsState = {
            ...initialState,
            orderDetails: {
                order: {
                    number: 2
                },
                name: "New order",
                success: true
            }
        }

        const state = reducer(testState, clearOrderDetails());
        expect(state.orderDetails).toBeNull();
    });
});