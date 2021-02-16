import React, { useState, useRef, useEffect } from 'react';
import styles from './Search.module.css';
import { Input } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import FavouritesModal from './../Modals/FavoritesModal/FavouritesModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos, setCurrentRequest, clearCurrentRequest } from './../../Redux/mainReducer';

const { Search } = Input;

const SearchComponent = () => {

  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const {request , isFav} = useSelector(state => state.root.currentRequest)

  useEffect(() => {
    setSearchValue(request)
  }, [request])


  const inputValue = useRef()

  const onSearch = async (value) => {
    dispatch(fetchVideos(value, 12));
  };

  const dispatch = useDispatch();

  const handleAddFav = () => {
    dispatch(setCurrentRequest({request: inputValue.current.state.value}))
    setVisible(!visible)
  }

  const handleCloseModal = () => {
    // clear modal form after close
    setVisible(!visible);
    //dispatch(clearCurrentRequest())
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Поиск видео</h1>
      <Search
        suffix={isFav && searchValue === request ? <HeartFilled /> : <HeartOutlined onClick={handleAddFav} />}
        className={styles.searchInput}
        value={searchValue}
        onChange={(value) => setSearchValue(value.currentTarget.value)}
        placeholder="Что хотите посмотреть"
        enterButton="Найти"
        size="large"
        onSearch={onSearch}
        ref={inputValue}
      ></Search>
      {visible && <FavouritesModal initialVisible={visible} handleClose={handleCloseModal} />}
      
    </div>
  );
};

export default SearchComponent;
