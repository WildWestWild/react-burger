import styles from "./app-main.module.css";
import { orderInformation } from "../../Constants";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services";
import { getBurgerIngredients } from "../../services/burger-ingredients/thunks";

function AppMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatcher = useAppDispatch();

  useEffect(() => {
    dispatcher(getBurgerIngredients());
  }, [dispatcher]);

  const { isLoading } = useAppSelector((store) => store.burgerIngredient);

  return (
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
  );
}

export default AppMain;
