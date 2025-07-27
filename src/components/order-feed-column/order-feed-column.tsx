import { FC } from "react";
import OrderCard from "../order-feed-card/order-feed-card";
import { useAppSelector } from "../../services";
import styles from "./order-feed-column.module.css";
import { TWsOrder } from "../../services/socketMiddleware/socketActions";

interface OrderFeedColumnProps {
  orders: TWsOrder[];
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
            name={order.name}
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
