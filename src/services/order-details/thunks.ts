import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderDetails } from './slice';
import { BASE_URL } from '../../Constants';

export type IngredientIdetificators = {
    ingredients: string[];
}


export const getOrderDetails = createAsyncThunk<OrderDetails, IngredientIdetificators[]>(
  'orderDetails/getOrderDetails', async (ingredientsIdenitificators) => {
    const response = await fetch(BASE_URL + '/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredientsIdenitificators),
    });

    if (!response.ok) {
        throw new Error('Response error!');
    }

    const json = await response.json();

    return json as OrderDetails;
  }
);