import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../model/model';
import OrderDetails from '../order-details/order-defails';
import PropTypes from 'prop-types';
import { useAppSelector, useAppDispatch } from '../../services';
import { setBun, addIngredient, sortIngredients } from '../../services/burger-constructor/slice';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { DraggableConstructorIngredient } from './draggable-constructor-ingredient/draggable-constructor-ingredient';
import { getOrderDetails } from '../../services/order-details/thunks';
import { incrementIngredientCount, pickBunCounter } from '../../services/burger-ingredients/slice';
import { clearOrderDetails } from '../../services/order-details/slice';


const BurgerConstructor = ({ isModalOpen, setIsModelOpen, orderInformation }) => {
  const burgerPickedIngredients = useAppSelector(store => store.burgerConstructor.burgerItems.ingredients);
  const burgerBun = useAppSelector(store => store.burgerConstructor.burgerItems.bun);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (!isLoading && !burgerBun) {
  //     const firstBun = burgerIngredients.find(item => item.type === 'bun');
  //     dispatch(setBun(firstBun));
  //   }
  // }, [isLoading, burgerBun, burgerIngredients, dispatch]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === 'bun') {
        dispatch(setBun(item));
        dispatch(pickBunCounter(item._id));
      } else {
        dispatch(addIngredient(item));
        dispatch(incrementIngredientCount(item._id));
      }
    },
  });

  const moveIngredient = (fromIndex, toIndex) => {
    dispatch(sortIngredients({ fromIndex, toIndex }));
  };

  const totalPrice = burgerBun && burgerPickedIngredients && burgerBun.price * 2 + burgerPickedIngredients.reduce((acc, i) => acc + i.price, 0)

  useEffect(() => {
    if (!isModalOpen) return;
    const ids = [burgerBun, burgerPickedIngredients ? burgerPickedIngredients : []]
      .map(item => item._id);

    dispatch(getOrderDetails({ ingredients: ids }));
  }, [isModalOpen, burgerBun, burgerPickedIngredients, dispatch]);

  const { orderDetails } = useAppSelector(store => store.orderDetails);
  const number = orderDetails && orderDetails.order && orderDetails.order.number;

  return (
    <section ref={dropRef} className={styles.container} aria-label="Конструктор бургера">
      {burgerBun ?
        <div>
          <ul className={styles.list}>

            {/* Верхняя булка */}
            <li className={styles.locked}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${burgerBun.name} (верх)`}
                price={burgerBun.price}
                thumbnail={burgerBun.image}
              />
            </li>

            {/* Начинки */}
            <li>
              <ul className={styles.scrollable}>
                {burgerPickedIngredients.map((item, index) => (
                  <li key={item.uuid}>
                    <DraggableConstructorIngredient
                      item={item}
                      index={index}
                      moveIngredient={moveIngredient}
                    />
                  </li>
                ))}
              </ul>
            </li>

            {/* Нижняя булка */}
            <li className={styles.locked}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${burgerBun.name} (низ)`}
                price={burgerBun.price}
                thumbnail={burgerBun.image}
              />
            </li>
          </ul>

          <div className={styles.footer}>
            <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
            <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={() => setIsModelOpen(true)}>
              Оформить заказ
            </Button>
            {isModalOpen && number && (
              <Modal title="" onClose={() => {
                setIsModelOpen(false);
                dispatch(clearOrderDetails());
              }
              }>
                <OrderDetails number={number} status={orderInformation.status} info={orderInformation.info} />
              </Modal>
            )}
          </div>

        </div> : <p className="text text_type_main-medium mb-8">Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p>}
    </section>
  );
};

BurgerConstructor.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModelOpen: PropTypes.func.isRequired,
  orderInformation: PropTypes.shape({
    number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
}

export default BurgerConstructor;
