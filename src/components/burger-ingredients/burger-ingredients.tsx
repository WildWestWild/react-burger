import React from 'react';
import { Data } from '../../utils/data'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from './ingredient-category/ingredient-category';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('buns');
  console.log(current);

  return (
    <section className={styles.container}>
      
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollable}>
        <IngredientCategory title="Булки" elements={Data.filter(r => r.type === "bun")}/>
        <IngredientCategory title="Соусы"  elements={Data.filter(r => r.type === "sauce")} />
        <IngredientCategory title="Начинки" elements={Data.filter(r => r.type === "main")} />
      </div>
    </section>
  );
};

export default BurgerIngredients;
