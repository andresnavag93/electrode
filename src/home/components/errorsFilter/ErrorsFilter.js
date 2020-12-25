import React, { useState } from 'react';
import { Input, Button, Divider } from 'antd';
import {
  SearchOutlined,
  RedoOutlined,
  EditOutlined,
  DownloadOutlined,
  FilterOutlined,
  ColumnHeightOutlined,
} from '@ant-design/icons';
import EditErrors from '../../components/editErrors/EditErrors';
import './errorsFilter.css';
const ErrorsFilter = ({ disableReprocessButton = false, disableEditButtton = false }) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const closeEditModal = (value) => setEditModalVisible(value);
  return (
    <div className="errors-filter-container">
      <Input
        placeholder="Search by keyword"
        suffix={<SearchOutlined />}
        className="errors-filter___searchbox"
      />
      <Button
        id="errors-filter-reprocess-button"
        disabled={disableReprocessButton}
        icon={<RedoOutlined />}
      >
        Reprocess IDocs in CILL
      </Button>
      <Button
        onClick={() => setEditModalVisible(true)}
        id="errors-filter-edit-button"
        disabled={disableEditButtton}
        icon={<EditOutlined />}
        className="errors-filter___button-margin"
      >
        Edit
      </Button>
      <EditErrors isModalVisible={isEditModalVisible} closeModal={closeEditModal} />
      <Button icon={<DownloadOutlined />}>Export as CSV</Button>
      <Divider type="vertical" className="errors-filter___divider" />
      <Button type="primary" icon={<FilterOutlined />} className="errors-filter___button-margin" />
      <Button type="secondary" icon={<ColumnHeightOutlined />} />
    </div>
  );
};
export default ErrorsFilter;
