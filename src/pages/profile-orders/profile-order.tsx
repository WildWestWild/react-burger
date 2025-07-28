import styles from "./profile-orders.module.css";
import { useState, useEffect, CSSProperties, JSX } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  getUserInfo,
  logoutUser,
  refreshToken,
} from "../../services/userAuth/thunks";
import { getAccessTokenFromCookie, retryIfAuthTokenNotFound } from "../../utils/tokens";
import OrderFeedColumn from "../../components/order-feed-column/order-feed-column";
import { twsConnect, twsDisconnect, twsOnConnected } from "../../services/socketMiddleware/socketActions";

export type Order = {
  _id: string;
  number: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  name: string;
  status: "done" | "pending" | "created";
};

export type OrderFeedResponse = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};

const disableDecorationWithInherit: CSSProperties = {
  textDecoration: "none",
  color: "inherit",
};
const disableDecoration: CSSProperties = { textDecoration: "none" };

const mainText: string = "text text_type_main-medium";
const smallText: string = "text text_type_main-medium text_color_inactive";

function ProfileOrders(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isProfileActive: boolean = location.pathname === "/profile";
  const isOrdersActive: boolean = location.pathname === "/profile/orders";

  useEffect(() => {
    retryIfAuthTokenNotFound(dispatch, refreshToken, getUserInfo);
  }, [dispatch]);

  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  const { ordersInfo, connected, error } = useAppSelector(
    (store) => store.orderFeed
  );

  const dipatch = useAppDispatch();

  useEffect(() => {
    dipatch(twsConnect(`wss://norma.nomoreparties.space/orders?token=${encodeURIComponent(getAccessTokenFromCookie())}`));

    return () => {
      dipatch(twsDisconnect());
    };
  }, [dipatch]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <NavLink
            to="/profile"
            style={
              isProfileActive ? disableDecorationWithInherit : disableDecoration
            }
            className={`${isProfileActive ? mainText : smallText} mb-8`}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            style={
              isOrdersActive ? disableDecorationWithInherit : disableDecoration
            }
            className={`${isOrdersActive ? mainText : smallText} mb-8`}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/login"
            onClick={onLogout}
            style={disableDecoration}
            className={`${smallText} mb-20`}
          >
            Выход
          </NavLink>

          <p
            style={{ width: "300px" }}
            className="text text_type_main-small text_color_inactive mt-2"
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.ordersDataBlock}>
          {!ordersInfo ? (
             <div className={styles.page}>Подлючение по сокету - {connected}. {error ? "Ошибка - " + error : null}</div>
          ) : (
            <OrderFeedColumn orders={ordersInfo.orders} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileOrders;
