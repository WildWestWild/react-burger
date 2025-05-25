import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";

function ResetPassword() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <PasswordInput
        onChange={onIconClick}
        value={value}
        name={"password"}
        extraClass={styles.input}
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
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
      <Button htmlType="button" type="primary" size="medium">
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPassword;
