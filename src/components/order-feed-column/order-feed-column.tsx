import { FC, use } from "react";
import { useAppSelector } from "../../services";
import styles from "./order-feed-column.module.css";
import { TWsOrder } from "../../services/socketMiddleware/socketActions";
import OrderCard from "../order-feed-card/order-feed-card";

interface OrderFeedColumnProps {
  orders: TWsOrder[];
}

function getRandom8DigitNumber(): number {
  return Math.floor(Math.random() * 90_000_000) + 10_000_000;
}

const OrderFeedColumn: FC<OrderFeedColumnProps> = ({ orders }) => {
  const { burgerIngredients } = useAppSelector(
    (store) => store.burgerIngredient
  );

  let id = 0;
  
  return (
    <div className={styles.columnForm}>
      <ul>
        {orders.map((order) => (
          <OrderCard
            id={++id}
            key={order._id}
            number={order.number}
            name={order.name}
            status={order.status}
            createdAt={order.createdAt}
            ingredients={order.ingredients.map(
              (id) => burgerIngredients.find((item) => item._id === id)!
            )}
            price={order.ingredients.reduce(
              (total, id) =>
                total +
                (burgerIngredients.find((item) => item._id === id)?.price || 0),
              0
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderFeedColumn;
