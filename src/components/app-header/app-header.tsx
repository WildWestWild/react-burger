import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.menuItem}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </div>
          <div className={styles.menuItem}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </div>
        </div>
        <div className={styles.center}>
          <Logo />
        </div>
        <div className={styles.right}>
          <div className={styles.menuItem}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
