import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import SearchComponent from './components/Search/Search';
import VideosGrid from './components/VideosGrid/VideosGrid';
import LoginModal from './components/Modals/LoginModal/LoginModal';
import Favorites from './components/Favorites/Favorites';
import { useSelector } from 'react-redux';



function App() {
  // check is user logged;
  const { username } = useSelector((state) => state.root.userData);

  return (
    <Router>
      {username ? (
        <div>
          <Redirect to="/search" />
          <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>
              <Route path="/search">
                <div className={styles.searchPage}>
                  <SearchComponent />
                  <VideosGrid />
                </div>
              </Route>
              <Route path="/favs" component={Favorites} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
      <div className={styles.loginWrapper}>
        <Route path="/login" component={LoginModal} />
      </div>
    </Router>
  );
}

export default App;

/*return (
    <Router>
      {username ? (
        <div>
          <Redirect to="/search" />
          <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>
              <Route path="/search">
                <div className={styles.searchPage}>
                  <SearchComponent />
                  <VideosGrid />
                </div>
              </Route>
              <Route path="/favs" component={Favorites} />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
      <Route path="/login" component={LoginModal} />
    </Router>
  );
  */
