import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Input, Select, Slider, InputNumber, Row, Col } from 'antd';
import styles from './Favourites.module.css';
import { addFavRequest, clearCurrentRequest, updateFavRequest } from '../../../Redux/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import { sortByAPIparamsType } from './../../../utils/api/api';

const { Option } = Select;

const FavouritesModal = ({ initialVisible, handleClose, editMode }) => {
  const { request, sortBy, maxResults, name, id } = useSelector((state) => state.root.currentRequest);

  const [visible, setVisible] = useState(initialVisible);
  const [requestValue, setRequestValue] = useState(request || '');
  const [nameValue, setNameValue] = useState(name || '');
  const [maxResultsValue, setMaxResultsValue] = useState(0);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setVisible(initialVisible);
    setMaxResultsValue(maxResults);
  }, [initialVisible]);


  const onRequestChange = (e) => {
    setRequestValue(e.target.value);
  }

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  }

  const handleCancel = () => {
    // dispatch(clearCurrentRequest());
    handleClose();
  };

  const handleSumbit = (formValues) => {
    const { name, sortBy, requestName } = formValues;

    if (editMode) {
      dispatch(updateFavRequest({ request: requestName || request, name, maxResults: maxResultsValue, sortBy, id }));
    } else {
      const favRequest = { request: request, name, maxResults: maxResultsValue, sortBy: sortBy || 'relevance' };
      dispatch(addFavRequest(favRequest));
    }
    handleClose();
  };

  const onChange = (value) => {
    setMaxResultsValue(value);
  };

  return (
    <div>
      <div className={styles.modalWrapper}>
        <Modal closable={false} footer={null} visible={visible} onCancel={handleCancel}>
          <p className={styles.title}>Сохранить запрос</p>
          <Form form={form} onFinish={handleSumbit} onSubmit={handleSumbit} layout="vertical">
            <Form.Item name="requestName" label="Запрос" initialValue={requestValue} >
              <Input disabled={!editMode} placeholder={request}  onChange={onRequestChange} />
            </Form.Item>

            <Form.Item
              name="name"
              initialValue={nameValue}
              label="Название"
              rules={[
                {
                  required: true,
                  message: 'Необходимо указать название запроса',
                },
              ]}
            >
              <Input placeholder="Укажите название"  onChange={onNameChange} />
            </Form.Item>

            <Form.Item label="Сортировать по" name="sortBy" initialValue={sortBy || 'relevance'}>
              <Select style={{ width: '100%' }}>
                <Option value="date">Дате</Option>
                <Option value="rating">Рейтингу</Option>
                <Option value="relevance">Релевантности (Стандартно)</Option>
                <Option value="title">Названию</Option>
                <Option value="videoCount">Кол-ву видео на канале</Option>
                <Option value="viewCount">Кол-ву просмотров</Option>
              </Select>
            </Form.Item>
            <Form.Item name="maxResults" initialValue={maxResults}>
              <div className={styles.sliderWrapper}>
                <Slider
                  name="maxResults"
                  className={styles.slider}
                  min={1}
                  max={50}
                  onChange={onChange}
                  value={typeof maxResultsValue === 'number' ? maxResultsValue : 12}
                />

                <InputNumber
                  min={1}
                  max={50}
                  value={typeof maxResultsValue === 'number' ? maxResultsValue : 12}
                  onChange={onChange}
                />
              </div>
            </Form.Item>

            <Form.Item>
              <div className={styles.buttonsWrapper}>
                <Button onClick={handleClose} size="large" type="primary" ghost>
                  Не сохранять
                </Button>
                <Button htmlType="submit" size="large" type="primary">
                  Сохранять
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default FavouritesModal;
