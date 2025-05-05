import { createSlice } from '@reduxjs/toolkit';
import { getBurgerIngredients } from './thunks';

export type BurgerIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
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
  },
  extraReducers: builder => {
    builder
      .addCase(getBurgerIngredients.fulfilled, (state, {payload}) => {
        state.burgerIngredients = payload;
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