import styles from './ingredient-details.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const IngredientDetails = ({ ingredient}) => {
  return (
    <div className={styles.modal}>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>

      <ul className={styles.nutrients}>
        <li>
          <p className="text text_type_main-default text_color_inactive">Калории</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Белки</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Жиры</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">Углеводы</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }).isRequired,
}

export default IngredientDetails;
