import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from './ingredient-category/ingredient-category';
import styles from './burger-ingredients.module.css';

function selectIngredientCategory(current, data){
    switch(current){
      case "mains": return <IngredientCategory title="Начинки" elements={data.filter(r => r.type === "main")}/>;
      case "sauces": return <IngredientCategory title="Соусы"  elements={data.filter(r => r.type === "sauce")}/>;
      default: return <IngredientCategory title="Булки" elements={data.filter(r => r.type === "bun")}/>;
    }
}

const BurgerIngredients = ( { data } ) => {
  const [current, setCurrent] = React.useState('buns');
  console.log(current);

  return (
    <section className={styles.container}>
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
        {selectIngredientCategory(current, data)}
      </div>
    </section>
  );
};

export default BurgerIngredients;
