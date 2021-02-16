import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import styles from './Favorites.module.css';
import { useSelector } from 'react-redux';
import FavouritesModal from './../Modals/FavoritesModal/FavouritesModal';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { favoriteRequestFetch, setCurrentRequest, clearCurrentRequest } from '../../Redux/mainReducer';
import FavItem from './FavoritesItem/FavoritesItem';

const { Title } = Typography;

const Favorites = () => {
  const { favoriteRequests } = useSelector((state) => state.root);

  const [visible, setVisible] = useState(false);
  const [requestName, setRequestName] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleChange = () => {
    debugger
    setVisible(!visible);
  };

  const handleApiCall = (favRequest) => {
    const {request, name, sortBy, maxResults} = favRequest;
    setVisible(!visible);
    dispatch(favoriteRequestFetch({ request, sortBy, maxResults }));
    dispatch(setCurrentRequest(favRequest))
  };

  const handleEditRequest = (favRequest) => {
    dispatch(setCurrentRequest(favRequest))
    setEditMode(true);
    setVisible(true);
  };

  return (
    <div>
      <Title level={2}>Избранное </Title>

      {/* TODO: Change text styling */}

      {favoriteRequests.map((fav, index) => {
        return (
          <FavItem handleEditRequest={handleEditRequest} key={fav.id} favRequest={fav} handleApiCall={handleApiCall} />
        );
      })}
      {visible && <FavouritesModal editMode={editMode} initialVisible={visible} handleClose={handleChange} />}
    </div>
  );
};

export default Favorites;
