import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

const IngredientCard = ({ item }) => {
  const { image, name, price, count = 0 } = item;

  return (
    <div className={styles.card}>
      {count > 0 && <Counter count={count} size="default" />}
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-1">{name}</p>
    </div>
  );
};

export default IngredientCard;
