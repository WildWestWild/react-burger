import { createAsyncThunk } from "@reduxjs/toolkit";
import { BurgerIngredient } from './slice';
import { BASE_URL } from "../../Constants";
import { checkResponse } from "../../utils/checkResponse";


export const getBurgerIngredients = createAsyncThunk<BurgerIngredient[]>(
    'burgerIngredients/getBurgerIngredients',
    async () => {
        const response = await fetch(BASE_URL + '/ingredients');
        const json = await checkResponse(response);
        return (json.data.map((item: { count: number;}) => 
            { 
                item.count = 0; 
                return item;
            }
        )) as BurgerIngredient[];
    }
  );