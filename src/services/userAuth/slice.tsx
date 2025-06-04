import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registrationUser, loginUser, logoutUser, getUserInfo, updateUserInfo } from './thunks';

export type User = {
    email : string,
    name: string,
    password?: string, // Optional for registration
}

export type UserState = {
    isLoading: boolean,
    isRegistered: boolean,
    blockedPath: string | null,
    error: string | null,
    accessToken: string | '',
    refreshToken: string | '',
    user: User | null
}

export const initalState : UserState = {
    isLoading: true,
    isRegistered: false,
    blockedPath : null,
    error: null,
    accessToken: '',
    refreshToken: '',
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers:{
        setBlockPath: (state, action: PayloadAction<string | null>) => {
            state.blockedPath = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.isLoading = false;
                //state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isRegistered = true;
                state.user = action.payload.user;
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
            .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.error = null;
                console.log('User info retrieved successfully:', action.payload);
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                console.error('Failed to retrieve user info:', action.error.message);
                state.isLoading = true;
                state.user = null;
                state.error = action.error.message || 'Failed to retrieve user info';
            })
            .addCase(updateUserInfo.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.error = null;
                console.log('User info updated successfully:', action.payload);
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                console.error('Failed to update user info:', action.error.message);
                state.isLoading = true;
                state.user = null;
                state.error = action.error.message || 'Failed to update user info';
            })
    }
});

export const { setBlockPath } = userSlice.actions;
