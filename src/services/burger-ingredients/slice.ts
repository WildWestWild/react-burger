import { createSlice } from '@reduxjs/toolkit';
import { getBurgerIngredients } from './thunks';

export const BURGER_INGREDIENT_TYPES = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
} as const;

export type BurgerIngredientType = typeof BURGER_INGREDIENT_TYPES[keyof typeof BURGER_INGREDIENT_TYPES];

export type BurgerIngredient = {
    _id: string,
    name: string,
    type: BurgerIngredientType,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    count: number | 0,
    __v: number
};

export type BurgerIngredientState = {
  burgerIngredients: BurgerIngredient[] | [];
  isLoading: boolean;
  error: string;
};

export const initialState: BurgerIngredientState = {
  burgerIngredients: [],
  isLoading: true,
  error: '',
};

export const burgerIngredientSlice = createSlice({
  name: 'burgerIngredient',
  initialState,
  reducers: {
    incrementIngredientCount: (state, action) => {
      const ingredient = state.burgerIngredients.find(item => item._id === action.payload);
      if (ingredient) {
        ingredient.count += 1;
      }
    },
    decreaseIngredientCount: (state, action) => {
      const ingredient = state.burgerIngredients.find(item => item._id === action.payload);
      if (ingredient && ingredient.count > 0) {
        ingredient.count -= 1;
      }
    },
    pickBunCounter: (state, action) => {
      state.burgerIngredients.map(item => {
        if (item.type === BURGER_INGREDIENT_TYPES.BUN && item._id === action.payload ) {
          item.count = 1;
        } else if (item.type === BURGER_INGREDIENT_TYPES.BUN && item._id !== action.payload) {
          item.count = 0;
        }
        
        return item;
      });
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getBurgerIngredients.fulfilled, (state, {payload}) => {
        state.burgerIngredients = payload.map(payloadItem => {
          const oldItem = state.burgerIngredients.find(item => item._id === payloadItem._id);
          return {
            ...payloadItem,
            count: oldItem ? oldItem.count : 0
          }
        });
        state.isLoading = false;
        state.error = '';
      })
      .addCase(getBurgerIngredients.rejected, (state, { error }) => {
        state.burgerIngredients = [];
        state.isLoading = true;
        state.error = error.message ?? 'Что-то пошло не так';
      })
  },
});

export const { incrementIngredientCount, decreaseIngredientCount, pickBunCounter } = burgerIngredientSlice.actions;