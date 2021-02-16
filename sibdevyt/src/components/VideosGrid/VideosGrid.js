import React from 'react';
import { Row, Col, Spin } from 'antd';
import styles from './VideosGrid.module.css';
import FilterPanel from './../FilterPanel/FilterPanel';
import VideoCard from './../VideoCard/VideoCard';
import FavouritesModal from './../Modals/FavoritesModal/FavouritesModal';
import { useSelector } from 'react-redux';

const VideosGrid = () => {
  const state = useSelector((state) => state.root);

  const {
    currentRequest: { request },
    totalResults,
    loading,
    videos,
  } = state;

  return (
    <div>
      {loading && (
        <div className={styles.spinWrapper}>
          <Spin size="large" />
        </div>
      )}
      {videos.length !== 0 && (
        <div className={styles.container}>
          {!loading && (
            <div>
              <FilterPanel requestName={request} totalResults={totalResults} />
              <div className={styles.content}>
                <Row gutter={[24, 24]}>
                  {videos &&
                    videos.map((i, index) => {
                      return (
                        <Col key={i.id.videoId + i.etag} span={6}>
                          <VideoCard key={i.id.videoId} video={i} />
                        </Col>
                      );
                    })}
                </Row>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideosGrid;
