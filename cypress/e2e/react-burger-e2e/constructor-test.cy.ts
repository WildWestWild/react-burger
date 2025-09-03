describe("React-Burger Main Page", () => {
  beforeEach(() => {
    cy.visit("https://wildwestwild.github.io/react-burger");
  });

  it("should put ingredients in constructor", () => {
    // Найти ингредиент, например "Краторная булка"
    cy.contains(
      ".ingredient-card_card__GmCrb",
      "Краторная булка N-200i"
    ).trigger("dragstart");

    cy.get(".burger-constructor_container__DRYdQ").trigger("drop");
    // Проверяем, что ингредиент появился
    cy.get(
      ":nth-child(3) > .constructor-element > .constructor-element__row > .constructor-element__text"
    )
      .should("exist")
      .contains("Краторная булка N-200i");

    // Найти ингредиент, например "Соус Spicy-X"
    cy.contains(".ingredient-card_card__GmCrb", "Соус Spicy-X").trigger(
      "dragstart"
    );

    cy.get(".burger-constructor_container__DRYdQ").trigger("drop");
    // Проверяем, что ингредиент появился
    cy.get(
      ".draggable-constructor-ingredient_item__Nrzka > .constructor-element"
    )
      .should("exist")
      .contains("Соус Spicy-X");
  });

  it("should open and close ingredient modal", () => {
    // Кликаем по ингредиенту
    cy.contains(
      ".ingredient-card_card__GmCrb",
      "Краторная булка N-200i"
    ).click();
    // Проверяем, что модалка открылась
    cy.get(".model_headerBetween__YovpP > div > .text").should("exist");
    // Закрываем: кликаем по кнопке "X"
    cy.get(".model_close__aQhfs").click();
    // Проверяем, что модалка закрылась
    cy.get(".model_headerBetween__YovpP > div > .text").should("not.exist");
  });

  it("should press order button and check modal", () => {
    // Найти ингредиент, например "Краторная булка"
    cy.contains(
      ".ingredient-card_card__GmCrb",
      "Краторная булка N-200i"
    ).trigger("dragstart");

    cy.get(".burger-constructor_container__DRYdQ").trigger("drop");
    // Проверяем, что ингредиент появился
    cy.get(
      ":nth-child(3) > .constructor-element > .constructor-element__row > .constructor-element__text"
    )
      .should("exist")
      .contains("Краторная булка N-200i");

    // Найти ингредиент, например "Соус Spicy-X"
    cy.contains(".ingredient-card_card__GmCrb", "Соус Spicy-X").trigger(
      "dragstart"
    );

    cy.get(".burger-constructor_container__DRYdQ").trigger("drop");
    // Проверяем, что ингредиент появился
    cy.get(
      ".draggable-constructor-ingredient_item__Nrzka > .constructor-element"
    )
      .should("exist")
      .contains("Соус Spicy-X");

    // Нажимаем на кнопку оформления заказа
    cy.get(".button").contains('Оформить заказ').click();

    // Проверяем, на странице логина ли мы
    cy.get("body").then(($body) => {
      if ($body.find('input[name="email"]').length) {
        // Находим поля и вводим данные
        cy.get('input[name="email"]').type("kosi-maks@yandex.ru");
        cy.get('input[name="password"]').type("Test123456");

        // Нажимаем кнопку "Войти"
        cy.get(".button").contains("Войти").click();

        // Ждём, пока вернёмся на главную
        cy.location("pathname", { timeout: 10000 }).should(
          "include",
          "/react-burger"
        );
      }
    });

    // Снова нажимаем кнопку оформления заказа
    cy.get(".button").contains('Оформить заказ').click();

    // Ждём обработки заказа
    cy.get(".order-details_wrapper__Ljj6D", { timeout: 20000 }) // увеличил таймаут, вместо wait
      .should("exist")
      .contains("идентификатор заказа");
  });
});
