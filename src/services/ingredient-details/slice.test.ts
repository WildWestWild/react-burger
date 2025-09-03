import { clearIngredientDetails, Ingredient, ingredientDetailsSlice, initialState, setIngredientDetails } from "./slice";

const ingredientTest: Ingredient = {
  _id: "ig1",
  image_large: "/img_large.png",
  name: "Chicken",
  calories: 143,
  proteins: 65,
  fat: 34,
  carbohydrates: 123,
};

describe("ingredient-details slice", () => {
  const reducer = ingredientDetailsSlice.reducer;

  it("should return the initial state when passed an empty action", () => {
    const emptyAction = { type: "" };
    const state = reducer(undefined, emptyAction);
    expect(state).toEqual(initialState);
  });

  it("should set ingredient details", () => {
    const state = reducer(initialState, setIngredientDetails(ingredientTest));
    expect(JSON.stringify(state.ingredientDetails)).toBe(JSON.stringify(ingredientTest));
  });

  it("should clear ingredent details", () => {
    let state = reducer(initialState, setIngredientDetails(ingredientTest));
    state = reducer(initialState, clearIngredientDetails());
    expect(state.ingredientDetails).toBeNull();
  });
});
