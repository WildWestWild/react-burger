import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./registration.module.css";

function Registration() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValue(e.target.value)}
        icon={""}
        value={value}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass={styles.input}
      />
      <EmailInput
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass={styles.input}
      />
      <PasswordInput
        onChange={onChange}
        value={value}
        name={"password"}
        extraClass={styles.input}
        placeholder="Пароль"
      />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
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
