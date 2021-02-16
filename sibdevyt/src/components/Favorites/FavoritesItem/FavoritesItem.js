import React, {useState} from 'react';
import { Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './FavoritesItem.module.css';
import { useDispatch } from 'react-redux';
import {deleteFavRequest} from '../../../Redux/mainReducer'

const FavItem = ({ favRequest, handleApiCall, handleEditRequest }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch()

  const onHover = () => {
    setHover(true);
  };

  const onHoverLeave = () => {
    setHover(false);
  };

  const onDelete = (favRequest) => {
    dispatch(deleteFavRequest(favRequest))
  }


  return (
    <div onMouseEnter={onHover} onMouseLeave={onHoverLeave} className={styles.favWrapper}>
      <p className={`${styles.favItem} ${hover && styles.hover} `}>{favRequest.name}</p>
      {hover && (
        <div className={styles.buttonsBox}>
          <Button onClick={() =>handleApiCall(favRequest)} type="primary">
            <Link to="/search">Выполнить</Link>
          </Button>
          <Button onClick={() => handleEditRequest(favRequest)} type="link">
            Изменить
          </Button>
          <Button onClick={() => onDelete(favRequest)} danger type="text">
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
};

export default FavItem
