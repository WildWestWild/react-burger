import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredientType } from "../burger-ingredients/slice";

export type Item = {
  _id: string;
  text: string;
  name: string;
  price: number;
  type: BurgerIngredientType;
  image: string;
  count: number | null;
  uuid: string;
};

export type BurgerContractor = {
  bun: Item | null;
  ingredients: Item[];
};

export type BurgerConstructorState = {
  burgerItems: BurgerContractor;
  isLoading: boolean;
  error: string;
};

export const initialState: BurgerConstructorState = {
  burgerItems: {
    bun: null,
    ingredients: [],
  },
  isLoading: true,
  error: "",
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.burgerItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: Item) => {
        return { payload: { ...ingredient, uuid: uuidv4() } };
      },
    },
    removeIngredient: (state, action) => {
      const index = state.burgerItems.ingredients.findIndex(
        (item) => item.uuid === action.payload
      );
      if (index !== -1) {
        state.burgerItems.ingredients.splice(index, 1);
      }
    },

    setBun: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.burgerItems.bun = action.payload;
      },
      prepare: (ingredient: Item) => {
        return { payload: { ...ingredient, uuid: uuidv4() } };
      },
    },
    clearBurgerConstructor: (state) => {
      state.burgerItems = initialState.burgerItems;
    },
    sortIngredients: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const draggedItem = state.burgerItems.ingredients[fromIndex];

      state.burgerItems.ingredients.splice(fromIndex, 1);
      state.burgerItems.ingredients.splice(toIndex, 0, draggedItem);
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  setBun,
  clearBurgerConstructor,
  sortIngredients,
} = burgerConstructorSlice.actions;
