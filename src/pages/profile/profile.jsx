import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { getUserInfo, logoutUser } from "../../services/userAuth/thunks";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../../services/userAuth/thunks";
import { retryIfAuthTokenNotFound } from "../../utils/tokens";

const disableDecorationWithInherit = {
  textDecoration: "none",
  color: "inherit",
};
const disableDecoration = { textDecoration: "none" };

const mainText = "text text_type_main-medium mb-8";
const smallText = "text text_type_main-medium text_color_inactive mt-2";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isWithInheritProfile, setisWithInheritProfile] = useState(true);
  const [isWithInheritProfileOrders, setisWithInheritProfileOrders] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.userAuth.user);
  useEffect(() => {
    if (name === "" && email === "" && user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, name, email]);


  const onLogout = async (e) => {
    e.preventDefault();
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  useEffect(() => {
    retryIfAuthTokenNotFound(dispatch, refreshToken, getUserInfo);
  }, [dispatch]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <NavLink
            to="/profile"
            style={
              isWithInheritProfile
                ? disableDecorationWithInherit
                : disableDecoration
            }
            className={({ isActive }) => {
              setisWithInheritProfile(isActive);
              let result = isActive ? `${mainText}` : `${smallText}`;
              return `${result} mb-8`;
            }}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            style={
              isWithInheritProfileOrders
                ? disableDecorationWithInherit
                : disableDecoration
            }
            className={({ isActive }) => {
              setisWithInheritProfileOrders(isActive);
              let result = isActive ? `${mainText}` : `${smallText}`;
              return `${result} mb-8`;
            }}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/login"
            onClick={(e) => onLogout(e)}
            style={
              isWithInheritProfileOrders
                ? disableDecorationWithInherit
                : disableDecoration
            }
            className={({ isActive }) => {
              setisWithInheritProfileOrders(isActive);
              let result = isActive ? `${mainText}` : `${smallText}`;
              return `${result} mb-20`;
            }}
          >
            Выход
          </NavLink>
        </div>
        <div className={styles.innerContent}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setName(e.target.value)}
            icon={"EditIcon"}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={styles.input}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) => setEmail(e.target.value)}
            icon={"EditIcon"}
            value={email}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={styles.input}
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            extraClass={styles.input}
            placeholder="Пароль"
            icon={"EditIcon"}
          />
        </div>
      </div>
      <div className={styles.containerSmalltext}>
        <p
          style={{ width: "300px" }}
          className="text text_type_main-small text_color_inactive mt-2"
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  );
}

export default Profile;
