import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, CSSProperties, JSX } from 'react';

const disableDecorationWithInherit: CSSProperties = {
  textDecoration: 'none',
  color: 'inherit',
};

const disableDecoration: CSSProperties = {
  textDecoration: 'none',
};

const mainText = 'text text_type_main-default ml-2';
const smallText = 'text text_type_main-default text_color_inactive ml-2';

const whiteIcon = 'primary';
const grayIcon = 'secondary';

function AppHeader(): JSX.Element {
  const [isWithInheritProfile, setIsWithInheritProfile] = useState<boolean>(true);
  const [isWithInheritConstractor, setIsWithInheritConstractor] = useState<boolean>(true);
  const [isWithInheritFeed, setIsWithInheritFeed] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    setIsWithInheritConstractor(
      location.pathname === '/' || location.pathname.startsWith('/ingredients')
    );

    setIsWithInheritProfile(location.pathname.startsWith('/profile'));

    setIsWithInheritFeed(location.pathname.startsWith('/feed'));
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
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? mainText : smallText
              }
            >
              Конструктор
            </NavLink>
          </div>
          <div className={styles.menuItem}>
            <ListIcon type={isWithInheritFeed ? whiteIcon : grayIcon} />
            <NavLink
              to="/feed"
              style={isWithInheritFeed ? disableDecorationWithInherit : disableDecoration}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? mainText : smallText
              }
            >
              Лента заказов
            </NavLink>
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
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? mainText : smallText
              }
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
