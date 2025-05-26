import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { loginUser } from "../../services/user/thunks";
import { useAppDispatch, useAppSelector } from "../../services";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../../utils/checkEmail";
import { useEffect } from "react";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.userAuth);
  const isLoading = user.isLoading;
  const error = user.error;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const buttonDisabled = !(password && isEmailValid);

  const onLoginClick = () => {
    if (buttonDisabled) {
      return;
    }

    dispatch(loginUser({ email, password }));
    setIsLogin(true);
  };

  useEffect(() => {
    setIsEmailValid(checkEmail(email));
  }, [email]);

  useEffect(() => {
    if (isLogin && !isLoading) {
      setIsLogin(false);
      navigate("/");
      setTimeout(() => {
        setEmail("");
        setPassword("");
      }, 3000);
    }
  }, [isLogin, isLoading, navigate]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass={styles.input}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={"password"}
        extraClass={styles.input}
        placeholder="Пароль"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={onLoginClick}
      >
        Войти
      </Button>
        {error && (
            <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
            {error}
            </p>
        )}
      <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
        Вы - новый пользователь?{" "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive ml-2 mt-2">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default Login;
