import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css'
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const disableDecorationWithInherit = {
  textDecoration: "none",
  color: "inherit",
};
const disableDecoration = { textDecoration: "none" };

const mainText = "text text_type_main-default ml-2";
const smallText = "text text_type_main-default text_color_inactive ml-2";

const whiteIcon = "primary";
const grayIcon = "secondary";

function AppHeader() {
  const [isWithInheritProfile, setisWithInheritProfile] = useState(true);
  const [isWithInheritConstractor, setisWithInheritConstractor] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setisWithInheritConstractor(
      location.pathname === '/' || location.pathname.startsWith('/ingredients')
    );
    
    setisWithInheritProfile(location.pathname.startsWith('/profile'));
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.menuItem}>
            <BurgerIcon type={isWithInheritConstractor ? whiteIcon : grayIcon} />
            <NavLink
              to="/"
              style={isWithInheritConstractor ? disableDecorationWithInherit : disableDecoration}
              className={({ isActive }) => isActive ? mainText : smallText}
            >
              Конструктор
            </NavLink>
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
            <ProfileIcon type={isWithInheritProfile ? whiteIcon : grayIcon} />
            <NavLink
              to="/profile"
              style={isWithInheritProfile ? disableDecorationWithInherit : disableDecoration}
              className={({ isActive }) => isActive ? mainText : smallText}
            >
              Личный кабинет
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}


export default AppHeader;
