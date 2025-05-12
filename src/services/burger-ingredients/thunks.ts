import { createAsyncThunk } from "@reduxjs/toolkit";
import { BURGER_INGREDIENT_TYPES, BurgerIngredient } from './slice';
import { BASE_URL } from "../../Constants";
import { checkResponse } from "../../utils/checkResponse";


export const getBurgerIngredients = createAsyncThunk<BurgerIngredient[]>(
    'burgerIngredients/getBurgerIngredients',
    async () => {
        const response = await fetch(BASE_URL + '/ingredients');
        const json = await checkResponse(response);
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