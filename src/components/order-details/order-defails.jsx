import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useAppSelector, useAppDispatch } from '../../services';
import { useEffect } from 'react';
import { getOrderDetails } from '../../services/order-details/thunks';

const OrderDetails = ({ingredients, status, info}) => {
  const dispatcher = useAppDispatch();
  const { orderDetails, isLoading } = useAppSelector(store => store.orderDetails);
  const number = orderDetails && orderDetails.order && orderDetails.order.number;

  useEffect(() => {
    const ids = ingredients
    .map(item => item._id);

    dispatcher(getOrderDetails({ ingredients: ids }));
  }, [ingredients, dispatcher]);

  return (!isLoading &&
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

OrderDetails.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default OrderDetails;
