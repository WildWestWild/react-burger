import { createSlice } from '@reduxjs/toolkit';

type Item = {
  _id: string;
  text: string;
  price: number;
  image: string;
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
        addIngredient: (state, action) => {
            console.log("addIngredient", action.payload);
            state.burgerItems.ingredients.push(action.payload);
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
        }
    }
});

export const { addIngredient, removeIngredient, setBun, clearBurgerConstructor } = burgerConstructorSlice.actions;