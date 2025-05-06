import { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import Modal from '../../model/model';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import  { useAppDispatch } from '../../../services';
import { clearIngredientDetails } from '../../../services/ingredient-details/slice';
import { useDrag } from 'react-dnd';


const IngredientCard = ({ item }) => {
  const { image, name, price, count = 0 } = item;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
  });

  const dispatcher = useAppDispatch();

  const [selectedIngredient, setSelectedIngredient] = useState(false);

  let divState = true;
  
  return (
    <div ref={dragRef} className={styles.card} onClick={() => setSelectedIngredient(divState)}>
      {count > 0 && <Counter count={count} size="default" />}
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon type="primary" />
        { selectedIngredient ? (
          <Modal onClose={() => 
              { 
                divState = false; 
                setSelectedIngredient(false); 
                dispatcher(clearIngredientDetails())
              }
            } title="Детали ингредиента">
            <IngredientDetails ingredient={item} />
          </Modal>) : null}
      </div>
      <p className="text text_type_main-default mt-1">{name}</p>
    </div>
  );
};

IngredientCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
}

export default IngredientCard;
