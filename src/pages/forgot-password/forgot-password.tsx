import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, JSX } from "react";
import { Link } from "react-router-dom";
import styles from "./forgot-passwrod.module.css";
import { checkEmail } from "../../utils/checkEmail";
import { useAppDispatch, useAppSelector } from "../../services";
import { sendResetEmail } from "../../services/userReset/thunks";
import { useNavigate } from "react-router-dom";
import { setForgotPasswordCompleted, UserResetState } from "../../services/userReset/slice";

function ForgotPassword(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userReset = useAppSelector<UserResetState>((store) => store.userReset);

  const error: string | null =
    userReset.error ||
    (userReset.userReset && !userReset.userReset.success
      ? userReset.userReset.message
      : null);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(sendResetEmail({ email }));

    if (sendResetEmail.fulfilled.match(resultAction)) {
      dispatch(setForgotPasswordCompleted());
      navigate("/reset-password", { replace: true });
    } else {
      console.error("Failed to send reset email:", resultAction.error);
    }
  };

  useEffect(() => {
    setIsEmailValid(checkEmail(email));
    return () => {
      if (userReset.userReset && userReset.userReset.success) {
        setEmail("");
        setIsEmailValid(false);
      }
    };
  }, [email, userReset.userReset]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form onSubmit={onFormSubmit}>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass={styles.input}
        />
        <Button
          disabled={!isEmailValid || userReset.isLoading}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
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

export default ForgotPassword;

