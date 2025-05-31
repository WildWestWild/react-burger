import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./forgot-passwrod.module.css";
import { checkEmail } from "../../utils/checkEmail";
import { useAppDispatch, useAppSelector } from "../../services";
import { sendResetEmail } from "../../services/userReset/thunks";
import { useNavigate } from "react-router-dom";
import { clearReset } from "../../services/userReset/slice";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const dispatch = useAppDispatch();
  const userReset = useAppSelector((store) => store.userReset);
  const error =
    userReset.error ||
    (userReset.userReset && !userReset.userReset.success
      ? userReset.userReset.message
      : null);

  const onSendResetEmail = async () => {
    const resultAction = await dispatch(sendResetEmail({ email }));

    if (sendResetEmail.fulfilled.match(resultAction)) {
      navigate("/reset-password");
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
        dispatch(clearReset());
      }
    };
  }, [email, userReset.userReset, dispatch]);
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass={styles.input}
      />
      <Button
        disabled={!isEmailValid && userReset.isLoading}
        htmlType="button"
        type="primary"
        size="medium"
        onClick={onSendResetEmail}
      >
        Восстановить
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

export default ForgotPassword;
