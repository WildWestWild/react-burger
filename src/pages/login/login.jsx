import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useState, useRef } from 'react';
import styles from './login.module.css';


function Login() {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };
  return (
    <div className={styles.ImputMargin}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <Input 
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValue(e.target.value)}
            icon={''}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            />
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
            />
        <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
        </Button>
    </div>
  );
}

export default Login;