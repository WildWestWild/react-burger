import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { burgerIngredientSlice } from './burger-ingredients/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';

export const store = configureStore({
    reducer: {
      burgerIngredient: burgerIngredientSlice.reducer,
      burgerConstructor: burgerConstructorSlice.reducer
    }
  });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;