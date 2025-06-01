import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registrationUser, loginUser, logoutUser } from './thunks';

export type User = {
    email : string,
    name: string,
    password?: string, // Optional for registration
}

export type UserState = {
    isLoading: boolean,
    isRegistered: boolean,
    error: string | null,
    accessToken: string | '',
    refreshToken: string | '',
    user: User | null
}

export const initalState : UserState = {
    isLoading: true,
    isRegistered: false,
    error: null,
    accessToken: '',
    refreshToken: '',
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.isLoading = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                //state.user = action.payload.user;
                state.isRegistered = true;
                state.error = null;
                console.log('Registration successful:', action.payload);
            })
            .addCase(registrationUser.rejected, (state, action) => {
                console.error('Registration failed:', action.error.message);
                state.isLoading = true;
                state.accessToken = '';
                state.refreshToken = '';
                state.user = null;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.isLoading = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.error = null;
                console.log('Login successful:', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error('Login failed:', action.error.message);
                state.isLoading = true;
                state.accessToken = '';
                state.refreshToken = '';
                state.user = null;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(logoutUser.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.isLoading = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.isRegistered = false;
                state.error = null;
                console.log('Logout successful:', action.payload);
            })
            .addCase(logoutUser.rejected, (state, action) => {
                console.error('Logout failed:', action.error.message);
                state.error = action.error.message || 'Logout failed';
            })
    }
});
