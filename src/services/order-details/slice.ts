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
    isOrderLoading: boolean;
    error: string;
}

export const initialState: OrderDetailsState = {
    orderDetails: null,
    isOrderLoading: true,
    error: '',
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        clearOrderDetails: (state) => {
            state.orderDetails = null;
            state.isOrderLoading = true;
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
                state.orderDetails = payload;
                state.isOrderLoading = false;
                state.error = '';
                console.log(payload);
            })
            .addCase(getOrderDetails.rejected, (state, { error }) => {
                state.orderDetails = null;
                state.isOrderLoading = true;
                state.error = error.message ?? 'Что-то пошло не так';
                console.log(error);
            })
    },
});

export const { clearOrderDetails } = orderDetailsSlice.actions;