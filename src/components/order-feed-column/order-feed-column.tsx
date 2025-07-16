import { FC } from "react";
import { Order } from "../../pages/feed/feed";
import OrderCard from "../order-feed-card/order-feed-card";
import { useAppSelector } from "../../services";
import styles from "./order-feed-column.module.css";

interface OrderFeedColumnProps {
  orders: Order[];
}

const OrderFeedColumn: FC<OrderFeedColumnProps> = ({orders}) => {
  const { burgerIngredients } = useAppSelector(
    (store) => store.burgerIngredient
  );
  return (
    <div className={styles.columnForm}>
      <ul>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            number={order.number}
            name={"Name order"}
            status={order.status}
            createdAt={order.createdAt}
            ingredients={order.ingredients.map(
              (id) => burgerIngredients.find((item) => item._id === id)!
            )}
            price={order.ingredients.reduce(
              (total, id) =>
                total +
                (burgerIngredients.find((item) => item._id === id)?.price ||
                  0),
              0
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderFeedColumn;
