import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import SearchComponent from './components/Search/Search';
import VideosGrid from './components/VideosGrid/VideosGrid';
import LoginModal from './components/Modals/LoginModal/LoginModal';
import Favorites from './components/Favorites/Favorites';
import { useSelector, useDispatch } from 'react-redux';
import SearchPage from './components/Pages/SearchPage';
import FavsPage from './components/Pages/FavsPage';
import Component404 from './views/Component404';
import { getUser } from './Redux/features/authSlice';

function App() {
  // check is user logged;
  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const protectedRoute = (Component) => {
    return username ? Component : <Redirect to="/login" />;
  };

  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <Router>
      <Switch>
        <div>
          <div className={styles.container}>
            {username && <Header />}
            <div className={styles.wrapper}>
              {!username && <Route path="/login" render={() => <LoginModal />} />}
              {protectedRoute(<Route  path="/favs" render={() => <FavsPage />} />)}
              {protectedRoute(<Route path="/search" render={() => <SearchPage />} />)}
            </div>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;