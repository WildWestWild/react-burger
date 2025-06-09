import styles from './ingredient-details.module.css';
import { useAppDispatch, useAppSelector } from '../../services';
import { Ingredient, setIngredientDetails } from '../../services/ingredient-details/slice';
import { useParams } from 'react-router-dom';

const IngredientDetails = ({isNotModal} : { isNotModal: Boolean}) => {
  const dispatcher = useAppDispatch();
  const { id } = useParams<string>();
  const { burgerIngredients } = useAppSelector<{ burgerIngredients: Ingredient[] }>((store) => store.burgerIngredient);
  const ingredient: Ingredient | undefined = burgerIngredients.find(r=>r._id === id);

  if(ingredient === undefined){
    return null;
  }
  
  dispatcher(setIngredientDetails({
    image_large: ingredient.image_large,
    name: ingredient.name,
    calories: ingredient.calories,
    proteins: ingredient.proteins,
    fat: ingredient.fat,
    carbohydrates: ingredient.carbohydrates,
  }));

  return (
    <div className={isNotModal ? styles.page : styles.modal}>
      {isNotModal && <h1>Детали ингредиента</h1>}
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


export default IngredientDetails;
