import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const IngredientCard = ({ item }) => {
  const { image, name, price, count = 0 } = item;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  const location = useLocation();

  return (
    <Link
      style={{ textDecoration: 'none', color: 'inherit' }}
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      ref={dragRef}
    >
      <div className={styles.card}>
        {count > 0 && <Counter count={count} size="default" />}
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

IngredientCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
  }).isRequired,
};

export default IngredientCard;
