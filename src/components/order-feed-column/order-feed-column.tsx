import { FC } from "react";
import { useAppSelector } from "../../services";
import styles from "./order-feed-column.module.css";
import { TWsOrder } from "../../services/socketMiddleware/socketActions";
import OrderCard from "../order-feed-card/order-feed-card";

interface OrderFeedColumnProps {
  orders: TWsOrder[];
  isUserProfile: boolean;
}

const OrderFeedColumn: FC<OrderFeedColumnProps> = ({
  orders,
  isUserProfile,
}) => {
  const { burgerIngredients } = useAppSelector(
    (store) => store.burgerIngredient
  );

  return (
    <div className={styles.columnForm}>
      <ul>
        {[...orders]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((order, index) => (
            <OrderCard
              id={++index}
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
              isUserProfile={isUserProfile}
            />
          ))}
      </ul>
    </div>
  );
};

export default OrderFeedColumn;
