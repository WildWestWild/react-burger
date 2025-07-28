import React, { useEffect } from "react";
import styles from "./feed.module.css";
import { useAppDispatch, useAppSelector } from "../../services";
import OrderFeedColumn from "../../components/order-feed-column/order-feed-column";
import { OrderStats } from "../../components/order-stats/order-stats";
import { wsConnect, wsDisconnect, wsOnConnected } from "../../services/socketMiddleware/socketActions";

const Feed: React.FC = () => {

  const {ordersInfo, connected, error} = useAppSelector((store) => store.feed);

  const dipatch = useAppDispatch();

  useEffect(() => {
    dipatch(wsConnect("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dipatch(wsDisconnect());
    }
  }, [dipatch]);

  if (!ordersInfo) return <div className={styles.page}>Подлючение по сокету - {connected}. {error ? "Ошибка - " + error : null}</div>;

  return (
    <div>
      <div className={styles.lineHeader}>
        <h1 className={styles.title}>Лента заказов</h1>
      </div>
      <div className={styles.feedMainBlock}>
        <OrderFeedColumn orders={ordersInfo.orders}/>
        <div className={styles.score}>
          <OrderStats
            ready={ordersInfo.orders.filter(order => order.status === "done").map(order => order.number)}
            inProgress={ordersInfo.orders.filter(order => order.status === "pending").map(order => order.number)}
            total={ordersInfo.total}
            totalToday={ordersInfo.totalToday}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
