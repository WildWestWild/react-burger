import styles from './app.module.css';
import { orderInformation } from '../../Constants'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services';
import { getBurgerIngredients } from '../../services/burger-ingredients/thunks';

function UpdateCountersInResponse(response, selectedBun, selectedOtherIngredients){
    return response.map(item => {
      if(item._id === selectedBun._id || selectedOtherIngredients.some(ingredient => ingredient._id === item._id)) {
        //item.count = 1;
      }

      return item;
    });
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatcher = useAppDispatch();
  
  useEffect(() => {
    dispatcher(getBurgerIngredients());
  }, [dispatcher]);

  const { burgerIngredients, isLoading } = useAppSelector(store => store.burgerIngredient);

  const bun = !isLoading && burgerIngredients.find(item => item.type === 'bun');

  const mains = !isLoading && burgerIngredients.filter(item => item.type === 'main');

  const showIngredientsWithCounters = !isLoading && UpdateCountersInResponse(burgerIngredients, bun, mains);

  return (
    <div className={styles.App}>
      <AppHeader/>
      <div className={styles["App-h1"]}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      </div>
      
      <div className={styles["App-Body"]}>
        {!isLoading ? (
            <>
              <BurgerIngredients data={showIngredientsWithCounters} />
              <BurgerConstructor
                bun={bun}
                ingredients={mains}
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
