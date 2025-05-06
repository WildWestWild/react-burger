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
  
        return (json.data.map((item: { count: number; }) => 
            { 
                item.count = 0; 
                return item;
            }
        )) as BurgerIngredient[];
    }
  );