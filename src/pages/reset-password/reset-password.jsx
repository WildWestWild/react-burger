import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./reset-password.module.css";
import { useAppDispatch, useAppSelector } from "../../services";
import { resetPassword } from "../../services/userReset/thunks";
import { useNavigate } from "react-router-dom";
import { clearReset } from "../../services/userReset/slice";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();
  const userReset = useAppSelector((store) => store.userReset);
  const error =
    userReset.error ||
    (userReset.userReset && !userReset.userReset.success
      ? userReset.userReset.message
      : null);

  const onResetPassword = async () => {
   const resultAction = await dispatch(resetPassword({'password': password, 'token': code}));

    if (resetPassword.fulfilled.match(resultAction)) {
        navigate("/login");
      } else {
        console.error("Failed to send reset email:", resultAction.error);
      }
  };
  
  const buttonDisabled = !(password && code && !userReset.isLoading);

  useEffect(() => {
    return () => {
        if (userReset.userReset && userReset.userReset.success) {
            setPassword("");
            setCode("");
            dispatch(clearReset());
        }
    }
  }, [userReset.isLoading, userReset.userReset, dispatch, navigate]);
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={"password"}
        extraClass={styles.input}
        placeholder="Введите новый пароль"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setCode(e.target.value)}
        icon={""}
        value={code}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass={styles.input}
      />
      <Button disabled={buttonDisabled} htmlType="button" type="primary" size="medium" onClick={onResetPassword}>
        Сохранить
      </Button>
        {error && (
            <p className="text text_type_main-default text_color_error mt-2">
            {error}
            </p>
        )}
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
