import {
  BurgerIngredientType,
} from "../burger-ingredients/slice";
import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  setBun,
  clearBurgerConstructor,
  sortIngredients,
  initialState,
  Item,
} from "./slice";

describe("burgerConstructor slice", () => {
  const reducer = burgerConstructorSlice.reducer;

  it("should return the initial state when passed an empty action", () => {
    const emptyAction = { type: "" };
    const state = reducer(undefined, emptyAction);
    expect(state).toEqual(initialState);
  });

  it("should handle addIngredient action", () => {
    const item: Item = {
      _id: "1",
      text: "Test Ingredient 1",
      name: "Ingredient 1",
      price: 100,
      type: BurgerIngredientType.MAIN, // пример типа
      image: "http://example.com/image1.png",
      count: null,
      uuid: "", // будет перезаписано prepare
    };
    let state = reducer(initialState, addIngredient(item));
    // После добавления одного ингредиента
    expect(state.burgerItems.ingredients).toHaveLength(1);
    expect(state.burgerItems.ingredients[0].name).toBe("Ingredient 1");
    expect(state.burgerItems.ingredients[0].uuid).toBeDefined();

    // Добавим ещё один ингредиент
    const item2: Item = {
      _id: "2",
      text: "Test Ingredient 2",
      name: "Ingredient 2",
      price: 200,
      type: BurgerIngredientType.MAIN,
      image: "http://example.com/image2.png",
      count: null,
      uuid: "",
    };
    state = reducer(state, addIngredient(item2));
    expect(state.burgerItems.ingredients).toHaveLength(2);
  });

  it("should handle removeIngredient action", () => {
    // Начнём с двух ингредиентов в состоянии
    const itemA: Item = {
      _id: "a",
      text: "Ingredient A",
      name: "A",
      price: 10,
      type: BurgerIngredientType.MAIN,
      image: "",
      count: null,
      uuid: "",
    };
    const itemB: Item = {
      _id: "b",
      text: "Ingredient B",
      name: "B",
      price: 20,
      type: BurgerIngredientType.MAIN,
      image: "",
      count: null,
      uuid: "",
    };
    let state = reducer(initialState, addIngredient(itemA));
    state = reducer(state, addIngredient(itemB));
    expect(state.burgerItems.ingredients).toHaveLength(2);

    // Удалим первый по uuid
    const uuidToRemove = state.burgerItems.ingredients[0].uuid;
    state = reducer(state, removeIngredient(uuidToRemove));
    expect(state.burgerItems.ingredients).toHaveLength(1);
    expect(
      state.burgerItems.ingredients.find((item) => item.uuid === uuidToRemove)
    ).toBeUndefined();
  });

  it("should handle setBun action", () => {
    const bunItem: Item = {
      _id: "bun1",
      text: "Test Bun",
      name: "Bun",
      price: 50,
      type: BurgerIngredientType.BUN,
      image: "",
      count: null,
      uuid: "",
    };
    const state = reducer(initialState, setBun(bunItem));
    expect(state.burgerItems.bun).not.toBeNull();
    expect(state.burgerItems.bun?.name).toBe("Bun");
    expect(state.burgerItems.bun?.uuid).toBeDefined();
  });

  it("should handle clearBurgerConstructor action", () => {
    // Добавим один ингредиент и булку
    const item: Item = {
      _id: "x",
      text: "Ingredient X",
      name: "X",
      price: 5,
      type: BurgerIngredientType.MAIN,
      image: "",
      count: null,
      uuid: "",
    };
    let state = reducer(initialState, addIngredient(item));
    const bun: Item = {
      _id: "bunx",
      text: "Bun X",
      name: "BunX",
      price: 15,
      type: BurgerIngredientType.BUN,
      image: "",
      count: null,
      uuid: "",
    };
    state = reducer(state, setBun(bun));
    // Проверяем, что есть булка и ингредиент
    expect(state.burgerItems.ingredients).toHaveLength(1);
    expect(state.burgerItems.bun).not.toBeNull();

    // Очищаем конструктор
    state = reducer(state, clearBurgerConstructor());
    expect(state.burgerItems.ingredients).toHaveLength(0);
    expect(state.burgerItems.bun).toBeNull();
  });

  it("should handle sortIngredients action", () => {
    // Подготовим состояние с 3 ингредиентами
    const item1: Item = {
      _id: "1",
      text: "Ingredient 1",
      name: "1",
      price: 1,
      type: BurgerIngredientType.BUN,
      image: "",
      count: null,
      uuid: "",
    };
    const item2: Item = {
      _id: "2",
      text: "Ingredient 2",
      name: "2",
      price: 2,
      type: BurgerIngredientType.BUN,
      image: "",
      count: null,
      uuid: "",
    };
    const item3: Item = {
      _id: "3",
      text: "Ingredient 3",
      name: "3",
      price: 3,
      type: BurgerIngredientType.BUN,
      image: "",
      count: null,
      uuid: "",
    };
    let state = reducer(initialState, addIngredient(item1));
    state = reducer(state, addIngredient(item2));
    state = reducer(state, addIngredient(item3));
    expect(state.burgerItems.ingredients.map((i) => i.name)).toEqual([
      "1",
      "2",
      "3",
    ]);

    // Переместим первый элемент (индекс 0) на индекс 2
    state = reducer(state, sortIngredients({ fromIndex: 0, toIndex: 2 }));
    expect(state.burgerItems.ingredients.map((i) => i.name)).toEqual([
      "2",
      "3",
      "1",
    ]);
  });
});
