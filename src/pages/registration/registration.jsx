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

function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.userAuth);
  const isLoading = user.isLoading;
  const error = user.error;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const buttonDisabled = !(name && password && isEmailValid);

  const onRegistrationClick = () => {
    if (buttonDisabled) {
      return;
    }
    
    dispatch(registrationUser({ name, email, password }));
    setIsRegistration(true);
  }

  useEffect(() => {
    setIsEmailValid(checkEmail(email));
  }, [email]);

  useEffect(() => {
    if (isRegistration && !isLoading) {
      setIsRegistration(false);
      navigate("/login");
      return (() => {
        setEmail("");
        setName("");
        setPassword("");
      });
    }
  }, [isRegistration, isLoading, navigate]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setName(e.target.value)}
        icon={""}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass={styles.input}
      />
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
      <Button disabled={buttonDisabled} htmlType="button" type="primary" size="medium" onClick={onRegistrationClick}>
        Зарегистрироваться
      </Button>
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
