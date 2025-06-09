import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './ingredient-category.module.css';
import { Item } from '../../../services/burger-constructor/slice';
import { FC } from 'react';

type IngredientCategoryProps = {
  title: String,
  elements: Item[]
}

const IngredientCategory: FC<IngredientCategoryProps> = ({ title, elements }) => {
  return (
    <section>
      <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
      <div className={styles.list}>
        {elements.map((item) => (
          <IngredientCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default IngredientCategory;
