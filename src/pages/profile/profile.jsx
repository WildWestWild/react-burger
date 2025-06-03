import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  getUserInfo,
  logoutUser,
  refreshToken,
  updateUserInfo,
} from "../../services/userAuth/thunks";
import { retryIfAuthTokenNotFound } from "../../utils/tokens";

const disableDecorationWithInherit = {
  textDecoration: "none",
  color: "inherit",
};
const disableDecoration = { textDecoration: "none" };

const mainText = "text text_type_main-medium";
const smallText = "text text_type_main-medium text_color_inactive";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowButtons, setIsShowButtons] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((store) => store.userAuth.user);

  const isProfileActive = location.pathname === "/profile";
  const isOrdersActive = location.pathname === "/profile/orders";

  const cancelCommand = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setIsShowButtons(false);
  };

  const saveChanges = async () => {
    await retryIfAuthTokenNotFound(
      dispatch,
      refreshToken,
      updateUserInfo,
      { name, email, password }
    );
    setIsShowButtons(false);
  };

  useEffect(() => {
    if (name === "" && email === "" && user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, name, email]);

  useEffect(() => {
    retryIfAuthTokenNotFound(dispatch, refreshToken, getUserInfo);
  }, [dispatch]);

  const onLogout = async (e) => {
    e.preventDefault();
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <NavLink
            to="/profile"
            style={isProfileActive ? disableDecorationWithInherit : disableDecoration}
            className={`${isProfileActive ? mainText : smallText} mb-8`}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            style={isOrdersActive ? disableDecorationWithInherit : disableDecoration}
            className={`${isOrdersActive ? mainText : smallText} mb-8`}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/login"
            onClick={(e) => onLogout(e)}
            style={disableDecoration}
            className={`${smallText} mb-20`}
          >
            Выход
          </NavLink>
        </div>

        <div className={styles.innerContent}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => {
              setName(e.target.value);
              setIsShowButtons(true);
            }}
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
            onChange={(e) => {
              setEmail(e.target.value);
              setIsShowButtons(true);
            }}
            icon={"EditIcon"}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={styles.input}
          />
          <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
              setIsShowButtons(true);
            }}
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

        {isShowButtons && (
          <div className={styles.buttons}>
            <div className={styles.cancel} onClick={cancelCommand}>
              Отменить
            </div>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={saveChanges}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
