import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient}) => {
  return (
    <div className={styles.modal}>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <p className="text text_type_main-default text_color_inactive mb-8">ingredient.</p>

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

export default IngredientDetails;
