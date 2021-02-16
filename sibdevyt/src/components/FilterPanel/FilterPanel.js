import React from 'react';
import { Typography, Space } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styles from './FilterPanel.module.css'
const { Title } = Typography;

const FilterPanel = ({requestName, totalResults}) => {
  return (
    <div>
      <div className={styles.header}>
        <div>
          <Title level={5}>
            Видео по запросу <b>"{requestName}"</b> <span className={styles.textMuted}>{totalResults}</span>
          </Title>
        </div>

        <div>
          <UnorderedListOutlined className={styles.icon} />
          <AppstoreOutlined className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
