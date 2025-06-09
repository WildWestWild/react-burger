import styles from "./profile.module.css";
import { useState, useEffect, CSSProperties, JSX } from "react";
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
import { checkEmail } from "../../utils/checkEmail";
import { checkPassword } from "../../utils/checkPassword";
import { User } from "../../services/userAuth/slice";

const disableDecorationWithInherit: CSSProperties = {
  textDecoration: "none",
  color: "inherit",
};
const disableDecoration: CSSProperties = { textDecoration: "none" };

const mainText: string = "text text_type_main-medium";
const smallText: string = "text text_type_main-medium text_color_inactive";

function Profile(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowButtons, setIsShowButtons] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector<User | null>((store) => store.userAuth.user);

  const isProfileActive: boolean = location.pathname === "/profile";
  const isOrdersActive: boolean = location.pathname === "/profile/orders";

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setIsEmailValid(checkEmail(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(checkPassword(password));
  }, [password]);

  const buttonDisabled = !(name && isEmailValid && isPasswordValid);

  const cancelCommand = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    setPassword("");
    setIsShowButtons(false);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await retryIfAuthTokenNotFound(dispatch, refreshToken, updateUserInfo, {
      name,
      email,
      password,
    });

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

  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
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
        </div>

        <form className={styles.innerContent} onSubmit={onFormSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => {
              setName(e.target.value);
              setIsShowButtons(true);
            }}
            icon="EditIcon"
            value={name}
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass={styles.input}
            onPointerEnterCapture={null}
            onPointerLeaveCapture={null}
          />
          <Input
            type="text"
            placeholder="Логин"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsShowButtons(true);
            }}
            icon="EditIcon"
            value={email}
            name="email"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass={styles.input}
            onPointerEnterCapture={null}
            onPointerLeaveCapture={null}
          />
          <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
              setIsShowButtons(true);
            }}
            value={password}
            name="password"
            extraClass={styles.input}
            placeholder="Пароль"
            icon="EditIcon"
          />
        </form>
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
                disabled={buttonDisabled}
                htmlType="submit"
                type="primary"
                size="medium"
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
