import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../model/model';
import OrderDetails from '../order-details/order-defails';
import PropTypes from 'prop-types';
import { useAppSelector, useAppDispatch } from '../../services';
import { setBun } from '../../services/burger-constructor/slice'; 
import { useEffect } from 'react';

const BurgerConstructor = ({ isModalOpen, setIsModelOpen, orderInformation }) => {

  const { burgerIngredients, isLoading } = useAppSelector(store => store.burgerIngredient);
  const { burgerItems } = useAppSelector(store => store.burgerConstructor);
  const burgerPickedIngredients = burgerItems.ingredients;
  const burgerBun = burgerItems.bun;
  const dispatcher = useAppDispatch();

  useEffect(() => {
      if (!isLoading && !burgerItems.bun) {
        const bun = burgerIngredients.find(item => item.type === 'bun');
        dispatcher(setBun(bun));
      }
  }, [isLoading]);

  return (burgerBun &&

    <section className={styles.container} aria-label="Конструктор бургера">
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
            <li key={item._id} className={styles.item}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
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
        {isModalOpen && (
          <Modal title="" onClose={() => setIsModelOpen(false)}>
            <OrderDetails ingredients={[burgerBun, burgerPickedIngredients ? burgerPickedIngredients : []]} number={orderInformation.number} status={orderInformation.status} info={orderInformation.info}/>
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
