import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type Item = {
  _id: string;
  text: string;
  price: number;
  image: string;
  key: string | '';
}

type BurgerContractor = {
    bun: Item | null;
    ingredients: Item[];
}

type BurgerConstructorState = {
    burgerItems: BurgerContractor;
    isLoading: boolean;
    error: string;
};

export const initialState: BurgerConstructorState = {
    burgerItems: {
        bun: null,
        ingredients: []
    },
    isLoading: true,
    error: '',
};

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient: {
              reducer: (state, action: PayloadAction<Item>) => {
                console.log("addIngredient", action.payload);
                state.burgerItems.ingredients.push(action.payload);
              },
              prepare: (ingredient: Item) => {
                return { payload: { ...ingredient, key: uuidv4() } };
              }
        },
        removeIngredient: (state, action) => {
            console.log("removeIngredient", action.payload);
            const index = state.burgerItems.ingredients.findIndex(item => item._id === action.payload);
            console.log("index", index);
            if (index !== -1) {
                state.burgerItems.ingredients.splice(index, 1);
            }
        },
        setBun: (state, action) => {
            state.burgerItems.bun = action.payload;
        },
        clearBurgerConstructor: (state) => {
            state.burgerItems = initialState.burgerItems;
        },
        sortIngredients: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            const draggedItem = state.burgerItems.ingredients[fromIndex];
            
            state.burgerItems.ingredients.splice(fromIndex, 1);
            state.burgerItems.ingredients.splice(toIndex, 0, draggedItem);
        }      
    }
});

export const { addIngredient, removeIngredient, setBun, clearBurgerConstructor, sortIngredients } = burgerConstructorSlice.actions;