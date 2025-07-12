import React, { useEffect, useState } from "react";
import styles from "./feed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderCard from "../../components/order-feed-card/order-feed-card";
import { useAppSelector } from "../../services";

type Order = {
  _id: string;
  number: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  status: "done" | "pending" | "created";
};

type OrderFeedResponse = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};

const Feed: React.FC = () => {
  const [ordersData, setOrdersData] = useState<OrderFeedResponse | null>(null);
  const ingredients = useAppSelector(
    (store) => store.burgerIngredient.burgerIngredients
  );
  console.log("Ingredients:", ingredients);

  useEffect(() => {
    // Заглушка: замените на API-запрос или WebSocket
    const mockResponse: OrderFeedResponse = {
      success: true,
      orders: [
        {
          _id: "abc123",
          number: 34535,
          ingredients: [
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa0941",
          ],
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
          status: "done",
        },
      ],
      total: 28752,
      totalToday: 138,
    };

    setOrdersData(mockResponse);
  }, []);

  if (!ordersData) return <div className={styles.page}>Загрузка...</div>;

  return (
    <div>
      <div className={styles.lineHeader}>
        <h1 className={styles.title}>Лента заказов</h1>
      </div>
      <div className={styles.page}>
        <div>
          <OrderCard
            number={ordersData.orders[0].number}
            name={"Name order"}
            createdAt={ordersData.orders[0].createdAt}
            ingredients={ordersData.orders[0].ingredients.map(
              (id) => ingredients.find((item) => item._id === id)!
            )}
            price={ordersData.orders[0].ingredients.reduce(
              (total, id) =>
                total +
                (ingredients.find((item) => item._id === id)?.price || 0),
              0
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
