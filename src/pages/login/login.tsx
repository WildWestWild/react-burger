import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { JSX, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { loginUser } from "../../services/userAuth/thunks";
import { useAppDispatch, useAppSelector } from "../../services";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../../utils/checkEmail";
import { useEffect } from "react";
import { checkPassword } from "../../utils/checkPassword";
import { UserState } from "../../services/userAuth/slice";

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector<UserState>((store) => store.userAuth);
  const isLoading = user.isLoading;
  const error = user.error;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setIsEmailValid(checkEmail(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(checkPassword(password));
  }, [password]);

  const buttonDisabled = !(isPasswordValid && isEmailValid);

  const onLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (buttonDisabled) {
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate(user.blockedPath ? user.blockedPath : "/", { replace: true });
      setIsLogin(true);
    } else {
      console.error("Login failed:", resultAction.error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (isLogin && !isLoading) {
      setIsLogin(false);

      return () => {
        setEmail("");
        setPassword("");
      };
    }
  }, [isLogin, isLoading, navigate]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form onSubmit={onLoginSubmit}>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="E-mail"
          isIcon={false}
          extraClass={styles.input}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          extraClass={styles.input}
          placeholder="Пароль"
        />
        <Button
          disabled={buttonDisabled}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>

      {error && (
        <p className="text text_type_main-default text_color_error mt-2">
          {error}
        </p>
      )}

      <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
        Вы — новый пользователь?{" "}
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
