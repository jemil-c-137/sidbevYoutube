import React, { useState } from 'react';
import styles from './LoginModal.module.css';
import { Form, Input, Button, Typography, Spin } from 'antd';
import logo from '../../../assests/img/sibdev-logo.png';
import { loginUser } from './../../../Redux/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
const { Title } = Typography;

const LoginModal = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logging } = useSelector((state) => state.root.userData);
  const dispatch = useDispatch();

  const onUsernameChange = (value) => {
    setUsername(value.target.value);
  };

  const onPasswordChange = (value) => {
    setPassword(value.target.value);
  };

  const onSubmitButton = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className={styles.container}>
      {logging ? (
        <Spin />
      ) : (
        <div className={styles.formWrapper}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          {/*  TODO: Change font size to 18px */}
          <Title className={styles.title} level={4}>
            Вход
          </Title>

          <Form
            name="normal_login"
            layout="vertical"
            className={styles.form}
            initialValues={{ remember: true }}
          >
            <Form.Item label="Логин" name="username">
              <Input placeholder="Логин" value={username} onChange={onUsernameChange} />
            </Form.Item>
            <Form.Item label="Пароль" name="password">
              <Input.Password placeholder="Пароль" value={password} onChange={onPasswordChange} />
            </Form.Item>

            <Form.Item>
              <Button onClick={onSubmitButton} type="primary" htmlType="submit" className="login-form-button">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
