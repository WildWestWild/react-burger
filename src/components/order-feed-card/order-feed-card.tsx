import React, { use, useEffect } from "react";
import styles from "./order-feed-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderStatus, OrderStatus } from "./order-text-status";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../services";
import { OrderCardPositions } from "../../services/socketMiddleware/socketActions";
import {
  addOrderCardPositing,
  removeOrderCardPosition,
} from "../../services/socketMiddleware/feedReducer";

function truncateVeryLongText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}


const OrderCard: React.FC<OrderCardPositions> = ({
  id,
  number,
  name,
  createdAt,
  ingredients,
  status,
  price,
}) => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      addOrderCardPositing({
        id,
        number,
        name,
        createdAt,
        ingredients,
        status,
        price,
      })
    );

    return () => {
      dispatch(removeOrderCardPosition(id));
    };
  }, []);

  return (
    <li className={styles.blockOrderCard}>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/feed/${id}`}
        state={{ background: location }}
      >
        <div className={styles.header}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} /> i-GMT+3
          </span>
        </div>
        <div className={styles.orderFeedTextPosition}>
          <h3 className="text text_type_main-medium mt-2 mb-2">{truncateVeryLongText(name)}</h3>
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
              <span className="text text_type_digits-default mr-2">
                {price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
