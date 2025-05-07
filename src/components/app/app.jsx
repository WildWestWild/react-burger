import styles from './app.module.css';
import { orderInformation } from '../../Constants'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services';
import { getBurgerIngredients } from '../../services/burger-ingredients/thunks';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatcher = useAppDispatch();
  
  useEffect(() => {
    dispatcher(getBurgerIngredients());
  }, [dispatcher]);

  const { burgerIngredients, isLoading } = useAppSelector(store => store.burgerIngredient);

  return (
    <div className={styles.App}>
      <AppHeader/>
      <div className={styles["App-h1"]}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      </div>
      
      <div className={styles["App-Body"]}>
        {!isLoading ? (
            <>
              <BurgerIngredients data={burgerIngredients} />
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

export default App;
