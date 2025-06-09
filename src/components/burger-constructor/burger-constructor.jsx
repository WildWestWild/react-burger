import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ bun, ingredients, onOrderClick }) => {
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
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={onOrderClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
