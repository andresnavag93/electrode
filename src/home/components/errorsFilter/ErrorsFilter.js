import React, { useState } from 'react';
import { Input, Button, Divider, Tooltip, Form } from 'antd';
import {
  RedoOutlined,
  EditOutlined,
  DownloadOutlined,
  FilterOutlined,
  ColumnHeightOutlined,
  ClearOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { CustomFilterFormItem } from '../../components/customFilterFormItem/CustomFilterFormItem';
import { searchErrors, errorTypes } from '../../constants/searchErrors';
import { isCillOrIsIdocError } from '../../utils/validations/searchErrors';
import EditErrors from '../../components/editErrors/EditErrors';
import SearchBar from '../../components/searchBar/SearchBar';
import './errorsFilter.css';
const ErrorsFilter = ({
  disableReprocessButton = false,
  disableEditButtton = false,
  selectedRow = [],
}) => {
  const { CILL, General, IDOC } = searchErrors;
  const { CILLType, IDOCType, None } = errorTypes;
  const [searchForm] = Form.useForm();
  const [errorsFilterForm] = Form.useForm();
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isCillFilter, setIsCillFilter] = useState(false);
  const [isIdocFilter, setIsIdocFilter] = useState(false);
  const [filterVisibleClassName, setFilterVisibleClassName] = useState(
    'errors-filter__filters-initial',
  );
  const closeEditModal = (value) => setEditModalVisible(value);
  const toggleFilter = (value) => {
    setFilterVisible(value);
    !isFilterVisible
      ? setFilterVisibleClassName('errors-filter__filters-active')
      : setFilterVisibleClassName('errors-filter__filters-initial');
  };
  const handleCillAndIdocFilters = (formValues) => {
    let filterType = isCillOrIsIdocError(formValues);
    switch (filterType) {
      case CILLType:
        setIsCillFilter(true);
        setIsIdocFilter(false);
        break;
      case IDOCType:
        setIsCillFilter(false);
        setIsIdocFilter(true);
        break;
      case None:
        setIsCillFilter(false);
        setIsIdocFilter(false);
        break;
      default:
        break;
    }
  };
  const onResetFiltersForm = () => {
    errorsFilterForm.resetFields();
  };
  return (
    <div>
      <Form
        form={searchForm}
        layout="horizontal"
        name="errorSearch"
        className="errors-filter__controls"
      >
        <div className="errors-filter___searchbox">
          <SearchBar form={searchForm} placeholder="Search by keyword" />
        </div>
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
        <EditErrors
          selectedError={selectedRow}
          isModalVisible={isEditModalVisible}
          closeModal={closeEditModal}
        />
        <Button icon={<DownloadOutlined />}>Export as CSV</Button>
        <Divider type="vertical" className="errors-filter___divider" />
        <Tooltip title="Filters">
          <Button
            type={isFilterVisible ? 'primary' : ''}
            icon={<FilterOutlined />}
            className="errors-filter___button-margin"
            onClick={() => toggleFilter(!isFilterVisible)}
          />
        </Tooltip>
        <Button type="secondary" icon={<ColumnHeightOutlined />} />
      </Form>
      <Divider className="errors-filter___section-divider" />
      <div className={`errors-filter__filters ${filterVisibleClassName}`}>
        <Form
          form={errorsFilterForm}
          initialValues={{ 'Amount Condition': '>' }}
          name="errorsFilterForm"
          // TO DO: When the API is available must connect the values.
          onFinish={(allValues) => console.log(allValues)}
          className="errors-filters___filter-form"
          onValuesChange={(changedValue, allValues) => handleCillAndIdocFilters(allValues)}
        >
          <CustomFilterFormItem
            type="select"
            filterObj={General.status}
            className="errors-filter___status"
          />
          <Divider type="vertical" className="errors-filter___status-divider" />
          <CustomFilterFormItem
            type="select"
            filterObj={General.errorType}
            className="errors-filter___error-type errors-filter___generic"
          />
          <CustomFilterFormItem
            type="input"
            filterObj={General.parentID}
            className="errors-filter___parent-id errors-filter___generic"
          />
          <CustomFilterFormItem
            type="select"
            filterObj={General.amountCondition}
            className="errors-filter___amount-condition errors-filter___generic"
          />
          <CustomFilterFormItem
            type="inputNumber"
            filterObj={General.amount}
            step={0.01}
            min={0}
            className="errors-filter___amount errors-filter___generic"
          />
          <CustomFilterFormItem
            type="input"
            filterObj={General.errorCode}
            className="errors-filter___error-code errors-filter___generic"
          />
          <CustomFilterFormItem
            type="datePicker"
            filterObj={General.creationDate}
            className="errors-filter___creation-date errors-filter___generic"
          />
          <CustomFilterFormItem
            type="input"
            filterObj={IDOC.batchID}
            className="errors-filter___batch-id errors-filter___generic"
            disabled={isCillFilter}
          />
          <CustomFilterFormItem
            type="input"
            filterObj={IDOC.iDocNumber}
            className="errors-filter___idoc-number errors-filter___generic"
            disabled={isCillFilter}
          />
          <CustomFilterFormItem
            type="input"
            filterObj={IDOC.cillUniqueIdentifier}
            className="errors-filter___parent-id errors-filter___generic"
            disabled={isCillFilter}
          />
          <CustomFilterFormItem
            type="select"
            filterObj={IDOC.reprocessFromCill}
            className="errors-filter___reprocess-from-cill errors-filter___generic"
            disabled={isCillFilter}
          />
          <CustomFilterFormItem
            type="inputNumber"
            filterObj={CILL.errorID}
            min={0}
            className="errors-filter___error-id errors-filter___generic"
            disabled={isIdocFilter}
          />
          <Button
            htmlType="submit"
            className="errors-filter___submit-button errors-filter___generic"
            type="primary"
            disabled={false}
            icon={<SearchOutlined />}
          >
            Apply Filters
          </Button>
          <Button
            htmlType="button"
            className="errors-filter___reset-button errors-filter___generic"
            icon={<ClearOutlined />}
            onClick={onResetFiltersForm}
          >
            Reset Filters
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default ErrorsFilter;
