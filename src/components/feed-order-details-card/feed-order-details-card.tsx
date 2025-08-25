import React, { FC } from "react";
import styles from "./feed-order-details-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  getOrderStatus,
  OrderStatus,
} from "../order-feed-card/order-text-status";
import { OrderCardPositions } from "../../services/socketMiddleware/socketActions";
import { BurgerIngredient } from "../../services/burger-ingredients/slice";

interface FeedOrderDetailsCardProps {
  isNotModal: Boolean;
  orderCardPositions: OrderCardPositions;
}

const FeedOrderDetailsCard: FC<FeedOrderDetailsCardProps> = ({
  isNotModal,
  orderCardPositions,
}) => {
  const getUniqueOrderCardPositions = () => {
    const uniqueBurgerIngredients: BurgerIngredient[] = [];

    orderCardPositions.ingredients.forEach((ingredient) => {
      const existingIngredient = uniqueBurgerIngredients.find(
        (item) => item._id === ingredient._id
      );
      if (existingIngredient) {
        existingIngredient.count += 1;
      } else {
        uniqueBurgerIngredients.push({ ...ingredient, count: 1 });
      }
    });

    return uniqueBurgerIngredients;
  };

  const uniqueCardOrderPositions = getUniqueOrderCardPositions();

  const total = uniqueCardOrderPositions.reduce(
    (sum, item) => sum + item.count * item.price,
    0
  );

  return (
    <div className={isNotModal ? styles.page : styles.modal}>
      {isNotModal ? (
        <p className="text text_type_digits-default">
          #{orderCardPositions.number}
        </p>
      ) : null}
      <div className={styles.startElements}>
        <p
          style={{ marginTop: 40, textAlign: "start" }}
          className="text text_type_main-medium"
        >
          {orderCardPositions.name}
        </p>
        {getOrderStatus(orderCardPositions.status as OrderStatus)}

        <p
          style={{ marginTop: 50, marginBottom: 20 }}
          className="text text_type_main-medium"
        >
          Состав:
        </p>

        <div className={styles.list}>
          {uniqueCardOrderPositions.map((item, index) => (
            <div className={styles.row} key={index}>
              <div className={styles.photoAndName}>
                <div className={styles.iconOuterWrapper}>
                  <div className={styles.iconInnerWrapper}>
                    <img
                      className={styles.iconImage}
                      src={item.image_mobile}
                      alt={item.name}
                    />
                  </div>
                </div>
                <p className={styles.name}>{item.name}</p>
              </div>
              <div className={styles.price}>
                {item.count} x {item.price}
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(orderCardPositions.createdAt)} />{" "}
            i-GMT+3
          </span>
          <div className={styles.digitAndIcon}>
            <span className="text_type_digits-default text_color_primary">
              {total}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedOrderDetailsCard;
