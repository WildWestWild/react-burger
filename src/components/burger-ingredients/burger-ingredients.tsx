import { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../services';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from './ingredient-category/ingredient-category';
import styles from './burger-ingredients.module.css';
import { Item } from '../../services/burger-constructor/slice';
import { BurgerIngredientType } from '../../services/burger-ingredients/slice';

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState<BurgerIngredientType>(BurgerIngredientType.BUN);

  const { burgerIngredients } = useAppSelector(
    (store) => store.burgerIngredient as { burgerIngredients: Item[] }
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0;

    const bunTop = Math.abs((bunsRef.current?.getBoundingClientRect().top ?? 0) - containerTop);
    const sauceTop = Math.abs((saucesRef.current?.getBoundingClientRect().top ?? 0) - containerTop);
    const mainTop = Math.abs((mainsRef.current?.getBoundingClientRect().top ?? 0) - containerTop);

    const min = Math.min(bunTop, sauceTop, mainTop);

    if (min === bunTop) setCurrent(BurgerIngredientType.BUN);
    else if (min === sauceTop) setCurrent(BurgerIngredientType.SAUCE);
    else if (min === mainTop) setCurrent(BurgerIngredientType.MAIN);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.tabs}>
        <Tab value="buns" active={current === BurgerIngredientType.BUN} onClick={() => setCurrent(BurgerIngredientType.BUN)}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === BurgerIngredientType.SAUCE} onClick={() => setCurrent(BurgerIngredientType.SAUCE)}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === BurgerIngredientType.MAIN} onClick={() => setCurrent(BurgerIngredientType.MAIN)}>
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollable} ref={containerRef}>
        <div ref={bunsRef}>
          <IngredientCategory
            title="Булки"
            elements={burgerIngredients.filter((r) => r.type === BurgerIngredientType.BUN)}
          />
        </div>
        <div ref={saucesRef}>
          <IngredientCategory
            title="Соусы"
            elements={burgerIngredients.filter((r) => r.type === BurgerIngredientType.SAUCE)}
          />
        </div>
        <div ref={mainsRef}>
          <IngredientCategory
            title="Начинки"
            elements={burgerIngredients.filter((r) => r.type === BurgerIngredientType.MAIN)}
          />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
