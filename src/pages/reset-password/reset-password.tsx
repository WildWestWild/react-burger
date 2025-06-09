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
import { clearReset, UserResetState } from "../../services/userReset/slice";
import { checkPassword } from "../../utils/checkPassword";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const dispatch = useAppDispatch();
  const userReset = useAppSelector<UserResetState>((store) => store.userReset);

  const error: string | null =
    userReset.error ||
    (userReset.userReset && !userReset.userReset.success
      ? userReset.userReset.message
      : null);

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setIsPasswordValid(checkPassword(password));
  }, [password]);

  const buttonDisabled: boolean = !(isPasswordValid && code && !userReset.isLoading);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(
      resetPassword({ password, token: code })
    );

    if (resetPassword.fulfilled.match(resultAction)) {
      navigate("/login", { replace: true });
    } else {
      console.error("Failed to reset password:", resultAction.error);
    }
  };

  useEffect(() => {
    return () => {
      if (userReset.userReset && userReset.userReset.success) {
        setPassword("");
        setCode("");
        dispatch(clearReset());
      }
    };
  }, [userReset.isLoading, userReset.userReset, dispatch]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form onSubmit={onFormSubmit}>
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          extraClass={styles.input}
          placeholder="Введите новый пароль"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name="code"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass={styles.input}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        />
        <Button
          disabled={buttonDisabled}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </form>
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
