import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const OrderDetails = ({number, status, info}) => {

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large mt-4 mb-8 glowNumber">{number}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>

      <div className={styles.icon}>
        <CheckMarkIcon type="primary" />
      </div>

      <p className="text text_type_main-default mt-15 mb-2">
        {status}
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        {info}
      </p>
    </div>
  );
};

export default OrderDetails;
