import {
  EmailInput,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert("Icon Click Callback");
    };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <EmailInput
        onChange={onIconClick}
        value={value}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass={styles.input}
      />
      <PasswordInput
        onChange={(e) => setValue(e.target.value)}
        value={value}
        name={"password"}
        extraClass={styles.input}
        placeholder="Пароль"
      />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
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
