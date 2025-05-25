import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';


function Login() {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  return (
    <div className={styles.container}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <Input 
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setValue(e.target.value)}
            icon={''}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={styles.input}
            />
        <Input 
            type={'text'}
            placeholder={'Пароль'}
            onChange={e => setValue(e.target.value)}
            icon={''}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass={styles.input}
            />
        <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive ml-2 mt-20">
            Вы - новый пользователь? <Link className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive ml-2 mt-2">
            Забыли пароль? <Link className={styles.link}>Восстановить пароль</Link>
        </p>
    </div>
  );
}

export default Login;