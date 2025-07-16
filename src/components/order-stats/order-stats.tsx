import styles from "./order-stats.module.css";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderStatsProps {
  ready: number[];
  inProgress: number[];
  total: number;
  totalToday: number;
}

export const OrderStats: FC<OrderStatsProps> = ({
  ready,
  inProgress,
  total,
  totalToday,
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.statuses}>
        <div className={styles.statusesColumn}>
          <h3 className="text text_type_main-medium mb-2">Готовы:</h3>
          <div className={styles.digitColumns}>
            <ul className={`${styles.list} ${styles.ready}`}>
              {ready.map((num) => (
                <li
                  key={num}
                  className="text text_type_digits-default text_color_success"
                >
                  {num}
                </li>
              ))}
            </ul>
            <ul className={`${styles.list} ${styles.ready}`}>
              {ready.map((num) => (
                <li
                  key={num}
                  className="text text_type_digits-default text_color_success"
                >
                  {num}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.statusesColumn}>
          <h3 className="text text_type_main-medium mb-2">В работе:</h3>
          <div className={styles.digitColumns}>
            <ul className={styles.list}>
              {inProgress.map((num) => (
                <li key={num} className="text text_type_digits-default">
                  {num}
                </li>
              ))}
            </ul>
            <ul className={styles.list}>
              {inProgress.map((num) => (
                <li key={num} className="text text_type_digits-default">
                  {num}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.dispalyBigDigits}>
          <h3 className="text text_type_main-medium">
            Выполнено за все время:
          </h3>
          <p className="text text_type_digits-large glow">
            {total.toLocaleString()}
          </p>
        </div>

        <div className={styles.dispalyBigDigits}>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className="text text_type_digits-large glow">{totalToday}</p>
        </div>
      </div>
    </section>
  );
};
