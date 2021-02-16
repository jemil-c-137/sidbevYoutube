import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import logo from '../../assests/img/sibdev-logo.png';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { clearVideos, logOut} from '../../Redux/mainReducer'
import {useDispatch} from 'react-redux'

const Header = () => {

  const dispatch = useDispatch()

  const handleToSearch = () => {
    dispatch(clearVideos())
  }

  const onLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img className={styles.headerLogo} src={logo} alt="" />
        <nav>
          <Button onClick={handleToSearch}>
            <Link to="/search">Поиск</Link>
          </Button>
          <Button>
            <Link to="/favs">Избранное</Link>
          </Button>
          <Button onClick={onLogOut}>
            Выйти
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
