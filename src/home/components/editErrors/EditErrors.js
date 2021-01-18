import React, { useRef, useState } from 'react';
import { Modal, Form, Button } from 'antd';
import EditIDocError from '../editIDocError/EditIDocError';
import EditCillError from '../editCillError/EditCillError';
import ReprocessIDocError from '../reprocessIDocError/ReprocessIDocError';
import isValidSession from './../../utils/isValidSession/isValidSession';
import { successMessage } from '../../utils/notifications/notifications';
import { errorTypes } from '../../constants/editErrors';
import './editErrors.css';
const { ERRORED_IDOC } = errorTypes;
const EditErrors = ({ isModalVisible, closeModal, selectedError, isErrorReprocess = false }) => {
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const childCillError = useRef();
  const submitForm = () => {
    if (isValidSession()) {
      form
        .validateFields()
        .then((values) => {
          // TODO: REMOVE THIS CONSOLE.LOG  WHEN API IS AVAILABLE
          console.log(values);
          form.resetFields();
          closeModal(false);
          successMessage('Form Submitted!');
        })
        .catch((info) => {
          // TODO: REMOVE THIS CONSOLE.LOG  WHEN API IS AVAILABLE
          console.log('Validate Failed:', info);
        });
    } else {
      // Redirects the user to the homepage so he can log in again
      window.location.replace('/');
    }
  };
  const selectForm = () => {
    if (!selectedError) return;
    if (selectedError.error === ERRORED_IDOC) {
      if (isErrorReprocess) {
        return (
          <ReprocessIDocError
            form={form}
            selectedError={selectedError}
            setSubmitButtonDisabled={setSubmitButtonDisabled}
          />
        );
      }
      return (
        <EditIDocError
          form={form}
          selectedError={selectedError}
          setSubmitButtonDisabled={setSubmitButtonDisabled}
        />
      );
    } else {
      return <EditCillError ref={childCillError} form={form} error={selectedError} />;
    }
  };
  const getModalTitle = () => {
    if (!selectedError) return;
    if (selectedError.error === ERRORED_IDOC && isErrorReprocess) {
      return 'Reprocess IDocs in CILL';
    } else if (selectedError.error === ERRORED_IDOC) {
      return 'Make Updates Based on S/4 Postings';
    } else {
      return 'Edit CILL Error';
    }
  };
  const close = () => {
    if (selectedError.error === ERRORED_IDOC) {
      form.resetFields();
      setSubmitButtonDisabled(true);
    } else {
      form.resetFields();
      form.setFieldsValue({
        fields: [''],
      });
      childCillError.current.cleanSelectedEditProp();
    }
    closeModal(false);
  };
  const getFooterButtons = () => {
    return [
      <Button key="cancel" onClick={() => close()}>
        Cancel
      </Button>,
      isErrorReprocess ? undefined : (
        <Button
          key="save"
          onClick={() => {
            /* TODO: Pending event handler */
          }}
        >
          Save
        </Button>
      ),
      <Button
        disabled={selectedError.error === ERRORED_IDOC ? isSubmitButtonDisabled : null}
        key="save_reprocess"
        type="primary"
        onClick={() => submitForm()}
      >
        Submit
      </Button>,
    ];
  };
  return (
    <Modal
      visible={isModalVisible}
      title={getModalTitle()}
      onCancel={() => close()}
      width={700}
      footer={getFooterButtons()}
    >
      {selectForm()}
    </Modal>
  );
};
export default EditErrors;
