import React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/antd.css';
import styles from './VideoCard.module.css';
import ReactPlayer from 'react-player/youtube';

const {Title} = Typography

const VideoCard = (props) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <ReactPlayer  config={{ playerVars: { showinfo: 1, 'origin': 'http://localhost:3000'  } }} width='245px' height="140px" url={`www.youtube.com/watch?v=${props.video.id.videoId}`} />
        </div>
        <p className={styles.cardTitle}>{props.video.snippet.title}</p>
        <p className={styles.cardDescription}>{props.video.snippet.channelTitle}</p>
      </div>
    </div>
  );
};

export default VideoCard;
