import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { burgerIngredientSlice } from './burger-ingredients/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { orderDetailsSlice } from './order-details/slice';
import { ingredientDetailsSlice } from './ingredient-details/slice';
import { userSlice } from './userAuth/slice';
import { userResetSlice } from './userReset/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { wsOrdersMiddleware } from './socketMiddleware';
import { feedSlice } from './socketMiddleware/feedReducer';

  const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['burgerConstructor', 'burgerIngredient', 'userAuth'], 
};

const rootReducer = combineReducers({
  burgerIngredient: burgerIngredientSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  userAuth: userSlice.reducer,
  userReset: userResetSlice.reducer,
  feed: feedSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(wsOrdersMiddleware)
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;