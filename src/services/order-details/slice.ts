import { createSlice } from '@reduxjs/toolkit';
import { getOrderDetails } from './thunks';

type Order = {
    number: number;
}

export type OrderDetails = {
    order: Order;
    name: string;
    success: boolean;
}

export type OrderDetailsState = {
    orderDetails: OrderDetails | null;
    isLoading: boolean;
    error: string;
}

export const initialState: OrderDetailsState = {
    orderDetails: null,
    isLoading: true,
    error: '',
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
                state.orderDetails = payload;
                state.isLoading = false;
                state.error = '';
                console.log(payload);
            })
            .addCase(getOrderDetails.rejected, (state, { error }) => {
                state.orderDetails = null;
                state.isLoading = true;
                state.error = error.message ?? 'Что-то пошло не так';
                console.log(error);
            })
    },
});