import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-passwrod.module.css';


function ForgotPassword() {
  const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.container}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <EmailInput
            onChange={onChange}
            value={value}
            name={'email'}
            placeholder='Укажите e-mail'
            isIcon={false}
            extraClass={styles.input}
        />
        <Button htmlType="button" type="primary" size="medium">
            Восстановить
        </Button>
        <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
           Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
    </div>
  );
}

export default ForgotPassword;