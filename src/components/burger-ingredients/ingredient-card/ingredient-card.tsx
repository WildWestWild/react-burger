import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { Item } from '../../../services/burger-constructor/slice';
import { FC } from 'react';

type IngredientCardProps = {
  item: Item
}

const IngredientCard: FC<IngredientCardProps> = ({ item }) => {
  const { image, name, price, count = 0 } = item;

  const [, dragRef] = useDrag<Item>(() => ({
    type: 'ingredient',
    item,
  }));

  const location = useLocation();

  return (
    <Link
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      ref={dragRef as unknown as React.Ref<HTMLAnchorElement>} // Приведение типа для устранения ошибки
    >
      <div className={styles.card}>
        {(count !== null) && count > 0 && <Counter count={count} size="default" />}
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-1">{name}</p>
      </div>
    </Link>
  );
};

export default IngredientCard;
