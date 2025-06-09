import { createSlice } from '@reduxjs/toolkit';

export type Ingredient ={
    _id: string; 
    image_large: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

type IngredientDetailsState = {
    ingredientDetails: Ingredient | null;
}

export const initialState: IngredientDetailsState = {
    ingredientDetails: null
}

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        setIngredientDetails: (state, action) => {
            state.ingredientDetails = action.payload;
        },
        clearIngredientDetails: (state) => {
            state.ingredientDetails = null;
        }
    }
});

export const { setIngredientDetails, clearIngredientDetails } = ingredientDetailsSlice.actions;

    