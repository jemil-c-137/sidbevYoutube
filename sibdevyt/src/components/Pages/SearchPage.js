import React from 'react';
import styles from './SearchPage.module.css';
import SearchComponent from '../Search/Search';
import VideosGrid from '../VideosGrid/VideosGrid';

const SearchPage = () => {
  return (
    <div className={styles.searchPage}>
      <SearchComponent />
      <VideosGrid />
    </div>
  );
};

export default SearchPage;
