import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { registrationUser } from "../../services/userAuth/thunks";
import { useNavigate } from "react-router-dom";
import styles from "./registration.module.css";
import { checkEmail } from "../../utils/checkEmail";
import { checkPassword } from "../../utils/checkPassword";
import { UserState } from "../../services/userAuth/slice";
import { JSX } from "react/jsx-runtime";

function Registration() : JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector<UserState>((store) => store.userAuth);
  const isLoading = user.isLoading;
  const error = user.error;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setIsEmailValid(checkEmail(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(checkPassword(password));
  }, [password]);

  const buttonDisabled: boolean = !(name && isPasswordValid && isEmailValid);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonDisabled) return;

    const resultAction = await dispatch(
      registrationUser({ name, email, password })
    );
    if (registrationUser.fulfilled.match(resultAction)) {
      navigate("/");
      setIsRegistration(true);
    } else {
      console.error("Registration failed:", resultAction.error);
      setIsRegistration(false);
    }
  };

  useEffect(() => {
    if (isRegistration && !isLoading) {
      setIsRegistration(false);
      return () => {
        setEmail("");
        setName("");
        setPassword("");
      };
    }
  }, [isRegistration, isLoading, navigate]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form onSubmit={onFormSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass={styles.input}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      {error && (
        <p className="text text_type_main-default text_color_error mt-2">
          {error}
        </p>
      )}
      <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Registration;
