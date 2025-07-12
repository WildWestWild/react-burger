import React from "react";
import styles from "./order-feed-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "../../services/burger-ingredients/slice";

interface OrderCardProps {
  number: number;
  name: string;
  createdAt: string;
  ingredients: BurgerIngredient[];
  price: number;
}

const OrderCard: React.FC<OrderCardProps> = ({
  number,
  name,
  createdAt,
  ingredients,
  price,
}) => {
  return (
    <>
      <div className={styles.blockOrderCard}>
        <div className={styles.header}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} /> i-GMT+3
          </span>
        </div>
        <div className={styles.orderFeedTextPosition}>
          <h3 className="text text_type_main-medium mt-2 mb-2">{name}</h3>
        </div>
        <div className={styles.orderFeedTextPosition}>
          <p style={{ color: " #FF2400" }}>Отменен</p>
        </div>
        <div className={styles.picturesAndPrice}>
          <div className={styles.icons}>
            {ingredients.slice(0, 6).map((item, index) => (
              <div
                className={styles.iconWrapper}
                key={item._id}
                style={{ left: `${index * 30}px`, zIndex: 10 - index }}
              >
                <img
                  className={styles.iconImage}
                  src={item.image_mobile}
                  alt={item.name}
                />
              </div>
            ))}
            {ingredients.length > 6 && (
              <div
                className={styles.iconWrapper}
                style={{ left: `${6 * 30}px`, zIndex: 0 }}
              >
                <div className={styles.extra}>+{ingredients.length - 6}</div>
              </div>
            )}
          </div>
          <div>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
      {/*<div className={styles.card}>
      <div className={styles.header}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} /> i-GMT+3
        </span>
      </div>

      <h3 className="text text_type_main-medium mt-2 mb-2">{name}</h3>

      <div className={styles.footer}>
        <div className={styles.icons}>
          {ingredients.slice(0, 6).map((item, index) => (
            <div
              className={styles.iconWrapper}
              key={item._id}
              style={{ left: `${index * -16}px`, zIndex: 10 - index }}
            >
              <img
                className={styles.iconImage}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
          ))}
          {ingredients.length > 6 && (
            <div className={styles.extra}>+{ingredients.length - 6}</div>
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div> */}
    </>
  );
};

export default OrderCard;
