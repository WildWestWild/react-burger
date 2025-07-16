import React, { useEffect, useState } from "react";
import styles from "./feed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderCard from "../../components/order-feed-card/order-feed-card";
import { useAppSelector } from "../../services";
import OrderFeedColumn from "../../components/order-feed-column/order-feed-column";
import { OrderStats } from "../../components/order-stats/order-stats";

export type Order = {
  _id: string;
  number: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  status: "done" | "pending" | "created";
};

export type OrderFeedResponse = {
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
          _id: "order1",
          number: 10001,
          ingredients: ["643d69a5c3f7b9001cfa0942", "643d69a5c3f7b9001cfa093c"],
          createdAt: "2025-07-16T10:00:00.000Z",
          updatedAt: "2025-07-16T10:05:00.000Z",
          status: "done",
        },
        {
          _id: "order2",
          number: 10002,
          ingredients: ["643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093c"],
          createdAt: "2025-07-16T10:10:00.000Z",
          updatedAt: "2025-07-16T10:15:00.000Z",
          status: "pending",
        },
        {
          _id: "order3",
          number: 10003,
          ingredients: ["643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0942"],
          createdAt: "2025-07-16T10:20:00.000Z",
          updatedAt: "2025-07-16T10:25:00.000Z",
          status: "done",
        },
        {
          _id: "order4",
          number: 10004,
          ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0942"],
          createdAt: "2025-07-16T10:30:00.000Z",
          updatedAt: "2025-07-16T10:35:00.000Z",
          status: "created",
        },
        {
          _id: "order5",
          number: 10005,
          ingredients: ["643d69a5c3f7b9001cfa0942"],
          createdAt: "2025-07-16T10:40:00.000Z",
          updatedAt: "2025-07-16T10:45:00.000Z",
          status: "pending",
        },
        {
          _id: "order6",
          number: 10006,
          ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941"],
          createdAt: "2025-07-16T10:50:00.000Z",
          updatedAt: "2025-07-16T10:55:00.000Z",
          status: "done",
        },
        {
          _id: "order7",
          number: 10007,
          ingredients: ["643d69a5c3f7b9001cfa0941"],
          createdAt: "2025-07-16T11:00:00.000Z",
          updatedAt: "2025-07-16T11:05:00.000Z",
          status: "done",
        },
        {
          _id: "order8",
          number: 10008,
          ingredients: ["643d69a5c3f7b9001cfa093c"],
          createdAt: "2025-07-16T11:10:00.000Z",
          updatedAt: "2025-07-16T11:15:00.000Z",
          status: "created",
        },
        {
          _id: "order9",
          number: 10009,
          ingredients: ["643d69a5c3f7b9001cfa0942", "643d69a5c3f7b9001cfa093c"],
          createdAt: "2025-07-16T11:20:00.000Z",
          updatedAt: "2025-07-16T11:25:00.000Z",
          status: "pending",
        },
        {
          _id: "order10",
          number: 10010,
          ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa0942",
          ],
          createdAt: "2025-07-16T11:30:00.000Z",
          updatedAt: "2025-07-16T11:35:00.000Z",
          status: "done",
        },
      ],
      total: 30000,
      totalToday: 150,
    };

    setOrdersData(mockResponse);
  }, []);

  if (!ordersData) return <div className={styles.page}>Загрузка...</div>;

  return (
    <div>
      <div className={styles.lineHeader}>
        <h1 className={styles.title}>Лента заказов</h1>
      </div>
      <div className={styles.feedMainBlock}>
        <OrderFeedColumn orders={ordersData.orders} />
        <div className={styles.score}>
          <OrderStats
            ready={[34533, 34532, 34530, 34527, 34525]}
            inProgress={[34538, 34541, 34542]}
            total={28752}
            totalToday={138}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
