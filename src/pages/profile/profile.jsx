import styles from "./profile.module.css";
import { useState, useRef } from "react";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <h1 className="text text_type_main-medium mb-8">Профиль</h1>
          <p className="text text_type_main-medium text_color_inactive mb-8">
            История заказов
          </p>
          <p className="text text_type_main-medium text_color_inactive mb-20">
            Выход
          </p>
        </div>
        <div className={styles.innerContent}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValue(e.target.value)}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={styles.input}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) => setValue(e.target.value)}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass={styles.input}
          />
          <PasswordInput
            onChange={(e) => setValue(e.target.value)}
            value={value}
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
