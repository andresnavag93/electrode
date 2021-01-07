import React from 'react';
import { Modal, Form, Button } from 'antd';
import EditIDocError from '../editIDocError/EditIDocError';
import EditCillError from '../editCillError/EditCillError';
import isValidSession from './../../utils/isValidSession/isValidSession';
import { successMessage } from '../../utils/notifications/notifications';
import './editErrors.css';

const EditErrors = ({ isModalVisible, closeModal, selectedError }) => {
  const [form] = Form.useForm();

  const submitForm = () => {
    if (isValidSession()) {
      // form
      //   .validateFields()
      //   .then((values) => {
      //   //TODO: REMOVE THIS CONSOLE.LOG  WHEN API IS AVAILABLE
      //     console.log(values);
      //     form.resetFields();
      //     closeModal(false);
      //     successMessage('Form Submitted!');
      //   })
      //   .catch((info) => {
      //     //TODO: REMOVE THIS CONSOLE.LOG  WHEN API IS AVAILABLE
      //     console.log('Validate Failed:', info);
      //   });
    } else {
      // Redirects the user to the homepage so he can log in again
      // window.location.replace('/');
    }
  };

  const selectForm = () => {
    if (selectedError === null || selectedError === undefined) return;
    if (selectedError.error === 'Errored IDoc') {
      return <EditIDocError form={form} selectedError={selectedError} />;
    } else {
      return <EditCillError form={form} error={selectedError} />;
    }
  };

  const getModalTitle = () => {
    if (selectedError === null || selectedError === undefined) return;
    if (selectedError.error === 'Errored IDoc') {
      return 'Make Updates Based on S/4 Postings';
    } else {
      return 'Edit CILL Error';
    }
  };

  const close = () => {
    if (selectedError.error === 'Errored IDoc') {
      form.resetFields();
    } else {
      form.resetFields();
      form.setFieldsValue({
        fields: [''],
      });
    }
    closeModal(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      title={getModalTitle()}
      onCancel={() => close()}
      width={700}
      footer={[
        <Button key="cancel" onClick={() => close()}>
          Cancel
        </Button>,
        <Button key="save" onClick={() => submitForm()}>
          Save
        </Button>,
        <Button key="save_reprocess" type="primary" onClick={() => submitForm()}>
          Submit
        </Button>,
      ]}
    >
      {selectForm()}
    </Modal>
  );
};
export default EditErrors;
