import React from "react";
import styles from "./order-feed-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "../../services/burger-ingredients/slice";

interface OrderCardProps {
  key: string;
  number: number;
  name: string;
  status: string;
  createdAt: string;
  ingredients: BurgerIngredient[];
  price: number;
}

enum OrderStatus {
  Cancel = "Отменен",
  Penging = "Готовится",
  Done = "Выполнен",
}

function getOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Cancel:
      return <p style={{ color: "#FF2400" }}>Отменен</p>;
    case OrderStatus.Penging:
      return <p style={{ color: "#F2C94C" }}>Готовится</p>;
    case OrderStatus.Done:
      return <p style={{ color: "#00CCCC" }}>Выполнен</p>;
    default:
      return <p style={{ color: "#FF2400" }}>Неизвестный статус</p>;
  }
}

const OrderCard: React.FC<OrderCardProps> = ({
  key,
  number,
  name,
  createdAt,
  ingredients,
  status,
  price,
}) => {
  return (
    <li key={key} className={styles.blockOrderCard}>
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
        {getOrderStatus(status as OrderStatus)}
      </div>
      <div className={styles.picturesAndPrice}>
        <div className={styles.icons}>
          {ingredients.slice(0, 12).map((item, index) => (
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
          {ingredients.length > 12 && (
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
            <span className="text text_type_digits-default mr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
