import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';
import ErrorsFilter from '../../components/errorsFilter/ErrorsFilter';
import TotalAmountDisplay from '../../components/totalAmountDisplay/TotalAmountDisplay';
import columns from './columns';
import data from '../../utils/mockData/ErrorsData';
import './searchResult.css';

const Dashboard = () => {
  const history = useHistory();
  const [selectedRows, setSelectedRows] = useState([]);
  const [disableEditButton, setDisableEditButton] = useState(true);
  const [disableReprocessButton, setDisableReprocessButton] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectionAmount, setSelectionAmount] = useState(0);

  const onSelectedChange = (selectedRowKey) => {
    let cillErrorsCount = 0;
    let idocErrorsCount = 0;
    let disableEdit = true;
    let disableReprocess = true;
    selectedRowKey.forEach((key) => {
      const currentError = data.find((error) => error.key === key);
      if (currentError.errorId !== '') cillErrorsCount += 1;
      else idocErrorsCount += 1;
    });
    if (cillErrorsCount === 1) {
      disableEdit = false;
    }
    if (idocErrorsCount > 0) {
      disableReprocess = false;
    }
    if (cillErrorsCount > 0 && idocErrorsCount > 0) {
      disableEdit = true;
      disableReprocess = true;
    }
    setSelectedRows(selectedRowKey);
    setDisableEditButton(disableEdit);
    setDisableReprocessButton(disableReprocess);
  };

  const onSelectAll = () => {
    setDisableEditButton(true);
    setDisableReprocessButton(true);
  };
  // TODO: this selection type will be hidden for the moment
  const selections = [
    Table.SELECTION_ALL,
    {
      key: 'CILL',
      text: 'select cills',
      onSelect: (changeableRowKeys) => {
        const cillsErrors = [];
        changeableRowKeys.forEach((key) => {
          const currentError = data.find((error) => error.key === key);
          if (currentError.errorId !== '') cillsErrors.push(currentError.key);
        });
        setSelectedRows(cillsErrors);
        setDisableReprocessButton(true);
        setDisableEditButton(false);
      },
    },
    {
      key: 'IDOC',
      text: 'select idocs',
      onSelect: (changeableRowKeys) => {
        const idocsErrors = [];
        changeableRowKeys.forEach((key) => {
          const currentError = data.find((error) => error.key === key);
          if (currentError.errorId === '') idocsErrors.push(currentError.key);
        });
        setSelectedRows(idocsErrors);
        setDisableReprocessButton(false);
        setDisableEditButton(true);
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: onSelectedChange,
    onSelectAll,
  };

  const onRow = (record, rowIndex) => ({
    onClick: () => {
      if (record.error === 'CILL Error') {
        history.push(`/cill-error-detail/${record.key}`);
      } else {
        history.push(`/idoc-error-detail/${record.key}`);
      }
    },
  });

  useEffect(() => {
    let currentDataTotalAmount = 0;
    if (!data) {
      setTotalAmount(currentDataTotalAmount);
    }
    data.forEach((error) => (currentDataTotalAmount += error.amount));
    setTotalAmount(currentDataTotalAmount);
  }, []);
  useEffect(() => {
    if (!selectedRows || selectedRows.length === 0) {
      setSelectionAmount(0);
      return;
    }
    let selectionTotalAmount = 0;
    selectedRows.forEach((key) => {
      const currentError = data.find((error) => error.key === key);
      if (currentError) {
        selectionTotalAmount += currentError.amount;
      }
    });
    setSelectionAmount(selectionTotalAmount);
  }, [selectedRows]);
  return (
    <div className="dashboard-container">
      <TotalAmountDisplay total={totalAmount} selectionTotal={selectionAmount} />
      <ErrorsFilter
        disableReprocessButton={disableReprocessButton}
        disableEditButtton={disableEditButton}
      />
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        className="dashboard___data-table"
        onRow={onRow}
      />
    </div>
  );
};
export default Dashboard;
