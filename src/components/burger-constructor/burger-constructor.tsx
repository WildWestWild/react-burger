import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../model/model';
import OrderDetails from '../order-details/order-defails';
import { useAppSelector, useAppDispatch } from '../../services';
import { setBun, addIngredient, sortIngredients, Item } from '../../services/burger-constructor/slice';
import { useEffect, useState, Dispatch, SetStateAction, Ref } from 'react';
import { useDrop } from 'react-dnd';
import { DraggableConstructorIngredient } from './draggable-constructor-ingredient/draggable-constructor-ingredient';
import { getOrderDetails } from '../../services/order-details/thunks';
import { incrementIngredientCount, pickBunCounter } from '../../services/burger-ingredients/slice';
import { clearOrderDetails } from '../../services/order-details/slice';
import { useNavigate } from 'react-router-dom';
import { setBlockPath, UserState } from '../../services/userAuth/slice';
import { retryIfAuthTokenNotFound } from '../../utils/tokens';
import { refreshToken } from '../../services/userAuth/thunks';
import { clearBurgerConstructor } from '../../services/burger-constructor/slice';
import { clearCounters } from '../../services/burger-ingredients/slice';


interface OrderInformation {
  number: string;
  status: string;
  info: string;
}

interface BurgerConstructorProps {
  isModalOpen: boolean;
  setIsModelOpen: Dispatch<SetStateAction<boolean>>;
  orderInformation: OrderInformation;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ isModalOpen, setIsModelOpen, orderInformation }) => {
  const burgerPickedIngredients  = useAppSelector<Item[]>(store => store.burgerConstructor.burgerItems.ingredients);
  const burgerBun = useAppSelector<Item | null>(store => store.burgerConstructor.burgerItems.bun);
  const isOrderLoading = useAppSelector<boolean>(store => store.orderDetails.isOrderLoading);
  const userAuth  = useAppSelector<UserState>(store => store.userAuth);
  const [isLoadingButtonDisabled, setLoadingButtonDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkRights = () => {
    if (userAuth.user) {
      setIsModelOpen(true);
    }
    else{
      dispatch(setBlockPath('/'));
      navigate('/login');
    }
  }
  
  const [, dropRef] = useDrop<Item>({
      accept: 'ingredient',
      drop: (item: Item) => {
        if (item.type === 'bun') {
          dispatch(setBun(item));
          dispatch(pickBunCounter(item._id));
        } else {
          dispatch(addIngredient(item));
          dispatch(incrementIngredientCount(item._id));
        }
      },
    }
  );

  const moveIngredient = (fromIndex: number, toIndex: number): void => {
    dispatch(sortIngredients({ fromIndex, toIndex }));
  };

  const totalPrice = burgerBun && burgerPickedIngredients && burgerBun.price * 2 + burgerPickedIngredients.reduce((acc, i) => acc + i.price, 0)

  useEffect(() => {
    if (!isModalOpen) return;
    setLoadingButtonDisabled(true);
    const ids = [
      ...(burgerBun ? [burgerBun] : []),
      ...(burgerPickedIngredients ?? [])
    ]
      .filter(item => item !== null)
      .map(item => item._id);
    
    retryIfAuthTokenNotFound(dispatch, refreshToken, getOrderDetails, { ingredients: ids })
      .then(() => {
        setLoadingButtonDisabled(false);
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
        setLoadingButtonDisabled(false);
      });
  }, [isModalOpen, burgerBun, burgerPickedIngredients, dispatch]);

  const { orderDetails } = useAppSelector(store => store.orderDetails);
  const number = orderDetails && orderDetails.order && orderDetails.order.number;

  return (
    <section ref={dropRef as unknown as Ref<HTMLDivElement>} className={styles.container} aria-label="Конструктор бургера">
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
            <Button disabled={isLoadingButtonDisabled} htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={(e) => checkRights()}>
              Оформить заказ
            </Button>
            {isModalOpen && number && !isOrderLoading && (
              <Modal title="" onClose={() => {
                setIsModelOpen(false);
                dispatch(clearOrderDetails());
                dispatch(clearBurgerConstructor());
                dispatch(clearCounters());
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

export default BurgerConstructor;
