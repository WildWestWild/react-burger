import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../services';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from './ingredient-category/ingredient-category';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('buns');
  const { burgerIngredients } = useAppSelector(store => store.burgerIngredient);

  const containerRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);      

  const handleScroll = () => {
    const containerTop = containerRef.current?.getBoundingClientRect().top;

    const bunTop = Math.abs(bunsRef.current?.getBoundingClientRect().top - containerTop);
    const sauceTop = Math.abs(saucesRef.current?.getBoundingClientRect().top - containerTop);
    const mainTop = Math.abs(mainsRef.current?.getBoundingClientRect().top - containerTop);

    const min = Math.min(bunTop, sauceTop, mainTop);

    if (min === bunTop) setCurrent('buns');
    else if (min === sauceTop) setCurrent('sauces');
    else if (min === mainTop) setCurrent('mains');
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
        <Tab value="buns" active={current === 'buns'} onClick={() => setCurrent('buns')}>Булки</Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={() => setCurrent('sauces')}>Соусы</Tab>
        <Tab value="mains" active={current === 'mains'} onClick={() => setCurrent('mains')}>Начинки</Tab>
      </div>

      <div className={styles.scrollable} ref={containerRef}>
        <div ref={bunsRef}>
          <IngredientCategory title="Булки" elements={burgerIngredients.filter(r => r.type === 'bun')} />
        </div>
        <div ref={saucesRef}>
          <IngredientCategory title="Соусы" elements={burgerIngredients.filter(r => r.type === 'sauce')} />
        </div>
        <div ref={mainsRef}>
          <IngredientCategory title="Начинки" elements={burgerIngredients.filter(r => r.type === 'main')} />
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
