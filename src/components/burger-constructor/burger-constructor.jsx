import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../model/model';
import OrderDetails from '../order-details/order-defails';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ bun, ingredients, isModalOpen, setIsModelOpen, orderInformation }) => {

  return (
    <section className={styles.container} aria-label="Конструктор бургера">
      <ul className={styles.list}>

        {/* Верхняя булка */}
        <li className={styles.locked}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>

        {/* Начинки */}
        <ul className={styles.scrollable}>
          {ingredients.map((item) => (
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
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>

      <div className={styles.footer}>
        <span className="text text_type_digits-medium mr-2">{bun.price * 2 + ingredients.reduce((acc, i) => acc + i.price, 0)}</span>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={() => setIsModelOpen(true)}>
          Оформить заказ
        </Button>
        {isModalOpen && (
          <Modal title="" onClose={() => setIsModelOpen(false)}>
            <OrderDetails number={orderInformation.number} status={orderInformation.status} info={orderInformation.info}/>
          </Modal>
        )}
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  bun: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModelOpen: PropTypes.func.isRequired,
  orderInformation: PropTypes.shape({
    number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
}

export default BurgerConstructor;
