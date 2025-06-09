import styles from "./app-main.module.css";
import { orderInformation } from "../../Constants";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { JSX, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { getBurgerIngredients } from "../../services/burger-ingredients/thunks";

function AppMain() : JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatcher = useAppDispatch();

  useEffect(() => {
    dispatcher(getBurgerIngredients());
  }, [dispatcher]);

  const { isLoading } = useAppSelector<{ isLoading: boolean }>((store) => store.burgerIngredient);

  return (
    <div>
      <div className={styles["App-h1"]}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
      </div>
      <div className={styles["App-Body"]}>
        {!isLoading ? (
          <>
            <BurgerIngredients />
            <BurgerConstructor
              isModalOpen={isModalOpen}
              setIsModelOpen={setIsModalOpen}
              orderInformation={orderInformation}
            />
          </>
        ) : (
          <p className="text text_type_main-medium">Загрузка ингредиентов...</p>
        )}
      </div>
    </div>
  );
}

export default AppMain;
