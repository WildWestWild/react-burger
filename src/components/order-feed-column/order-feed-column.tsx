import { FC } from "react";
import styles from "./order-feed-column.module.css";
import { OrderCardPositions, TWsOrder } from "../../services/socketMiddleware/socketActions";
import OrderCard from "../order-feed-card/order-feed-card";

interface OrderFeedColumnProps {
  orders: OrderCardPositions[];
  isUserProfile: boolean;
}

const OrderFeedColumn: FC<OrderFeedColumnProps> = ({
  orders,
  isUserProfile,
}) => {
  return (
    <div className={styles.columnForm}>
      <ul>
        {[...orders]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((order) => (
            <OrderCard
              key={order.number}
              number={order.number}
              name={order.name}
              status={order.status}
              createdAt={order.createdAt}
              ingredients={order.ingredients}
              price={order.price}
              isUserProfile={isUserProfile}
            />
          ))}
      </ul>
    </div>
  );
};

export default OrderFeedColumn;
