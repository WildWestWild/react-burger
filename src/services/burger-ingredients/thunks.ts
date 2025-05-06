import { createAsyncThunk } from "@reduxjs/toolkit";
import { BURGER_INGREDIENT_TYPES, BurgerIngredient } from './slice';
import { ingredientsJsonLink } from "../../Constants";


export const getBurgerIngredients = createAsyncThunk<BurgerIngredient[]>(
    'burgerIngredients/getBurgerIngredients',
    async () => {
        const response = await fetch(ingredientsJsonLink);
        if(!response.ok){
            throw new Error('Response error!');
        }

        const json = await response.json();
        let isSetCounterFirstBun = false;
        return (json.data.map((item: { count: number; type: string; }) => 
            { 
                if (item.type === BURGER_INGREDIENT_TYPES.BUN && !isSetCounterFirstBun) {
                    item.count = 1; 
                    isSetCounterFirstBun = true;
                } else {
                    item.count = 0; 
                }
                
                return item;
            }
        )) as BurgerIngredient[];
    }
  );