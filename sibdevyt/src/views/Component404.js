import React from 'react';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';


const Component404 = () => {

  const history = useHistory()

  const goHome= () => {
    history.push('/search');
  }

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Страница не найдена"
        extra={<Button onClick={goHome} type="primary">Вернуться на главную</Button>}
      />
    </div>
  );
};

export default Component404;
