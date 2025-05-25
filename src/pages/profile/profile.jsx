import styles from "./profile.module.css";
import { useState, useRef } from "react";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const disableDecorationWithInherit = { textDecoration: 'none', color: 'inherit' };
const disableDecoration = { textDecoration: 'none' };

const mainText = "text text_type_main-medium mb-8";
const smallText = "text text_type_main-medium text_color_inactive mt-2";

function Profile() {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const [isWithInheritProfile, setisWithInheritProfile] = useState(true);
  const [isWithInheritProfileOrders, setisWithInheritProfileOrders] = useState(true);
  
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.innerContent}>
          <NavLink
            to="/profile"
            style={isWithInheritProfile ? disableDecorationWithInherit : disableDecoration}
            className={({ isActive }) =>  
                {
                    setisWithInheritProfile(isActive);
                    let result = isActive ? `${mainText}` : `${smallText}`
                    return `${result} mb-8`
                }
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            style={isWithInheritProfileOrders ? disableDecorationWithInherit : disableDecoration}
            className={({ isActive }) =>  
                {
                    setisWithInheritProfileOrders(isActive);
                    let result = isActive ? `${mainText}` : `${smallText}`
                    return `${result} mb-8`
                }
            }
          >
            История заказов
          </NavLink>
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
