import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../model/model';
import OrderDetails from '../order-details/order-defails';
import PropTypes from 'prop-types';
import { useAppSelector, useAppDispatch } from '../../services';
import { setBun, addIngredient, removeIngredient } from '../../services/burger-constructor/slice'; 
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { getOrderDetails } from '../../services/order-details/thunks';
import { decreaseIngredientCount, incrementIngredientCount, pickBunCounter } from '../../services/burger-ingredients/slice';
import { clearOrderDetails } from '../../services/order-details/slice';


const getRandomInt = (min = 1, max = 100000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const BurgerConstructor = ({ isModalOpen, setIsModelOpen, orderInformation }) => {
  const { burgerIngredients, isLoading } = useAppSelector(store => store.burgerIngredient);
  const burgerPickedIngredients = useAppSelector(store => store.burgerConstructor.burgerItems.ingredients);
  const burgerBun = useAppSelector(store => store.burgerConstructor.burgerItems.bun);
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (!isLoading && !burgerBun) {
        const firstBun = burgerIngredients.find(item => item.type === 'bun');
        dispatch(setBun(firstBun));
      }
  }, [isLoading, burgerBun, burgerIngredients, dispatch]);

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


  useEffect(() => {
    if (!isModalOpen) return;
    const ids = [burgerBun, burgerPickedIngredients ? burgerPickedIngredients : []]
    .map(item => item._id);

    dispatch(getOrderDetails({ ingredients: ids }));
  }, [isModalOpen, burgerBun, burgerPickedIngredients, dispatch]);

  const { orderDetails } = useAppSelector(store => store.orderDetails);
  const number = orderDetails && orderDetails.order && orderDetails.order.number;

  return (burgerBun &&
    <section ref ={dropRef} className={styles.container} aria-label="Конструктор бургера">
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
        <ul className={styles.scrollable}>
          {burgerPickedIngredients.map((item) => (
            <li key={item._id + getRandomInt()} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => 
                  { 
                    dispatch(removeIngredient(item._id)) 
                    dispatch(decreaseIngredientCount(item._id));
                  }}
              />
            </li>
          ))}
        </ul>

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
        <span className="text text_type_digits-medium mr-2">{burgerBun.price * 2 + burgerPickedIngredients.reduce((acc, i) => acc + i.price, 0)}</span>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={() => setIsModelOpen(true)}>
          Оформить заказ
        </Button>
        {isModalOpen && number && (
          <Modal title="" onClose={() => 
            {
              setIsModelOpen(false);
              dispatch(clearOrderDetails());
            }
          }>
            <OrderDetails number={number} status={orderInformation.status} info={orderInformation.info}/>
          </Modal>
        )}
      </div>
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
