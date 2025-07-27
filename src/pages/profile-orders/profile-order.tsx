import styles from "./profile-orders.module.css";
import { useState, useEffect, CSSProperties, JSX } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services";
import {
  getUserInfo,
  logoutUser,
  refreshToken,
} from "../../services/userAuth/thunks";
import { retryIfAuthTokenNotFound } from "../../utils/tokens";
import OrderFeedColumn from "../../components/order-feed-column/order-feed-column";


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

  const [ordersData, setOrdersData] = useState<OrderFeedResponse | null>(null);

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

  useEffect(() => {
    // Заглушка: замените на API-запрос или WebSocket
    const mockResponse: OrderFeedResponse = {
      success: true,
      orders: [
        {
          _id: "order1",
          number: 10001,
          ingredients: ["643d69a5c3f7b9001cfa0942", "643d69a5c3f7b9001cfa093c"],
          createdAt: "2025-07-16T10:00:00.000Z",
          updatedAt: "2025-07-16T10:05:00.000Z",
          status: "done",
          name: "Бургер с беконом",
        }
      ],
      total: 30000,
      totalToday: 150,
    };

    setOrdersData(mockResponse);
  }, []);

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
          {!ordersData ? (
            <div className={styles.page}>Загрузка...</div>
          ) : (
            <OrderFeedColumn orders={ordersData.orders}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileOrders;
