import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import SearchComponent from '../../Search/Search';
import VideosGrid from '../../VideosGrid/VideosGrid';
import Favorites from '../../Favorites/Favorites';
import Header from '../../Header/Header';
import styles from './MainPage.module.css';



const MainPage = () => {


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <Route exact path="/">
          <div className={styles.searchPage}>
            <SearchComponent />
            <VideosGrid />
          </div>
        </Route>
        <Route path="/favs" component={Favorites} />
      </div>
    </div>
  );
};

export default MainPage;
