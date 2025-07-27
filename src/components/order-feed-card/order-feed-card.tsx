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
  Cancel = "cancelled",
  Penging = "pending",
  Done = "done",
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
          {ingredients.slice(0, 6).map((item, index) => {
            const isExtra = index === 5 && ingredients.length > 6;
            const extraCount = ingredients.length - 6;

            return (
              <div
                className={styles.iconOuterWrapper}
                key={item._id}
                style={{ left: `${index * 50 + 20}px`, zIndex: 10 - index }}
              >
                <div className={styles.iconInnerWrapper}>
                  <img
                    className={styles.iconImage}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                  {isExtra && <p className={styles.extra}>+{extraCount}</p>}
                </div>
              </div>
            );
          })}
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
