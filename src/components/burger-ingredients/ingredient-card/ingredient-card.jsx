import { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import Modal from '../../model/model';
import IngredientDetails from '../../ingredient-details/ingredient-details';


const IngredientCard = ({ item }) => {
  const { image, name, price, count = 0 } = item;

  const [selectedIngredient, setSelectedIngredient] = useState(false);

  return (
    <div className={styles.card} onClick={() => setSelectedIngredient(true)}>
      {count > 0 && <Counter count={count} size="default" />}
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
        { selectedIngredient ? (<Modal onClose={() => setSelectedIngredient(false)} title="Детали ингредиента">
          <IngredientDetails ingredient={item} />
        </Modal>) : null}
      </div>
      <p className="text text_type_main-default mt-1">{name}</p>
    </div>
  );
};

export default IngredientCard;
