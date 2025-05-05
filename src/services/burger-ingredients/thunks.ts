import { createAsyncThunk } from "@reduxjs/toolkit";
import { BurgerIngredient } from './slice';
import { ingredientsJsonLink } from "../../Constants";


export const getBurgerIngredients = createAsyncThunk<BurgerIngredient[]>(
    'burgerIngredients/getBurgerIngredients',
    async () => {
        const response = await fetch(ingredientsJsonLink);
        if(!response.ok){
            throw new Error('Response error!');
        }

        const json = await response.json();
  
        return (json.data) as BurgerIngredient[];
    }
  );