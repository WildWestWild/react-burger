import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendResetEmail, resetPassword } from './thunks';

export type UserReset = {
    success: boolean,
    message : string
}

export type UserResetState = {
    isForgotPasswordCompleted: boolean, 
    isLoading: boolean,
    error: string | null,
    userReset: UserReset | null
}

export const initalState : UserResetState = {
    isForgotPasswordCompleted: false,
    isLoading: false,
    error: null,
    userReset: null
}

export const userResetSlice = createSlice({
    name: 'userReset',
    initialState: initalState,
    reducers:{
        clearReset: (state) => {
            state.isLoading = false;
            state.error = null;
            state.userReset = null;
            state.isForgotPasswordCompleted = false;
        },
        setForgotPasswordCompleted: (state) => {
            state.isForgotPasswordCompleted = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendResetEmail.fulfilled, (state, action: PayloadAction<UserResetState>) => {
                state.isLoading = false;
                state.userReset = action.payload.userReset;
                console.log('Password reset email sent successfully:', action.payload);
            })
            .addCase(sendResetEmail.rejected, (state, action) => {
                console.error('Failed to send password reset email:', action.error.message);
                state.isLoading = true;
                state.userReset = null;
                state.error = action.error.message || 'Failed to send password reset email';
            })
            .addCase(resetPassword.fulfilled, (state, action: PayloadAction<UserResetState>) => {
                state.isLoading = false;
                state.userReset = action.payload.userReset;
                console.log('Password reset successful:', action.payload);
            })
            .addCase(resetPassword.rejected, (state, action) => {
                console.error('Password reset failed:', action.error.message);
                state.isLoading = true;
                state.userReset = null;
                state.error = action.error.message || 'Password reset failed';
            });
    }
});

export const { clearReset, setForgotPasswordCompleted } = userResetSlice.actions;
