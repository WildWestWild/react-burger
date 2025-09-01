import {
  BurgerIngredient,
  burgerIngredientSlice,
  BurgerIngredientState,
  BurgerIngredientType,
  clearCounters,
  decreaseIngredientCount,
  incrementIngredientCount,
  initialState,
  pickBunCounter,
} from "./slice";

export const getMockIngredients = (): BurgerIngredient[] => [
  {
    _id: "ingr1",
    name: "Краторная булка N-200i",
    type: "bun" as BurgerIngredientType,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 125,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    count: 0,
    __v: 0,
  },
  {
    _id: "ingr2",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main" as BurgerIngredientType,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    count: 0,
    __v: 0,
  },
  {
    _id: "ingr3",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main" as BurgerIngredientType,
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    count: 0,
    __v: 0,
  },
  {
    _id: "ingr4",
    name: "Соус Spicy-X",
    type: "sauce" as BurgerIngredientType,
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 200,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    count: 0,
    __v: 0,
  },
  {
    _id: "ingr5",
    name: "Хрустящие минеральные кольца",
    type: "main" as BurgerIngredientType,
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 100,
    price: 50,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    image_mobile:
      "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    image_large:
      "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    count: 0,
    __v: 0,
  },
  {
    _id: "ingr6",
    name: "Краторная булка N-300i",
    type: "bun" as BurgerIngredientType,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 125,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    count: 0,
    __v: 0,
  },
];

describe("burgerIngredients slice", () => {
  const reducer = burgerIngredientSlice.reducer;

  it("should return the initial state when passed an empty action", () => {
    const emptyAction = { type: "" };
    const state = reducer(undefined, emptyAction);
    expect(state).toEqual(initialState);
  });

  it("should increment ingredient count", () => {
    const testId = "ingr2";
    const testState: BurgerIngredientState = {
      ...initialState,
      burgerIngredients: getMockIngredients(),
    };
    const state = reducer(testState, incrementIngredientCount(testId));

    expect(state.burgerIngredients.find((r) => r._id === testId)?.count).toBe(
      1
    );
  });

  it("should decrement ingredient count", () => {
    const testId = "ingr3";
    const testState: BurgerIngredientState = {
      ...initialState,
      burgerIngredients: getMockIngredients(),
    };
    let state = reducer(testState, incrementIngredientCount(testId));
    expect(state.burgerIngredients.find((r) => r._id === testId)?.count).toBe(
      1
    );
    state = reducer(state, incrementIngredientCount(testId));
    expect(state.burgerIngredients.find((r) => r._id === testId)?.count).toBe(
      2
    );
    state = reducer(state, incrementIngredientCount(testId));
    expect(state.burgerIngredients.find((r) => r._id === testId)?.count).toBe(
      3
    );
    state = reducer(state, decreaseIngredientCount(testId));
    expect(state.burgerIngredients.find((r) => r._id === testId)?.count).toBe(
      2
    );
  });

  it("should pick bun", () => {
    const firstBun = "ingr1";
    const secondBun = "ingr6";

    const testState: BurgerIngredientState = {
      ...initialState,
      burgerIngredients: getMockIngredients(),
    };

    let state = reducer(testState, pickBunCounter(firstBun));
    expect(state.burgerIngredients.find((r) => r._id === firstBun)?.count).toBe(
      1
    );
    expect(
      state.burgerIngredients.find((r) => r._id === secondBun)?.count
    ).toBe(0);

    state = reducer(state, pickBunCounter(secondBun));
    expect(state.burgerIngredients.find((r) => r._id === firstBun)?.count).toBe(
      0
    );
    expect(
      state.burgerIngredients.find((r) => r._id === secondBun)?.count
    ).toBe(1);
  });

  it("should clear counters", () => {
    const testState: BurgerIngredientState = {
      ...initialState,
      burgerIngredients: getMockIngredients().map((r) => {
        return { ...r, count: 1 };
      }),
    };

    expect(
      (testState.burgerIngredients as BurgerIngredient[]).reduce(
        (sum: number, item: BurgerIngredient) => sum + (item.count ?? 0),
        0
      )
    ).toBe(6);

    const state = reducer(testState, clearCounters());

    expect(
      (state.burgerIngredients as BurgerIngredient[]).reduce(
        (sum: number, item: BurgerIngredient) => sum + (item.count ?? 0),
        0
      )
    ).toBe(0);
  });
});
