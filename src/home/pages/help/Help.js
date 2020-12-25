import React, { useState } from 'react';
import { Collapse, Typography, Select } from 'antd';
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import './help.css';
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const helpInfo = [
  {
    id: 1,
    title: 'Search and View IDoc Error Details',
    instructions: [
      '1.  On the landing page, select values for the mandatory creation date filters.',
      '2.  In the search bar, enter the parameter name(s) for any search criteria you have related to the IDoc such as Parent ID, Batch ID, IDoc Number, and/or CILL unique identifier.',
      '3.  In the dropdown, select the parameters you want to search by.',
      '4.  Following the selected parameters in the search bar, enter the parameter values you want to search by and click "Search".',
      '5.  On the search results screen, use the filter and/or sort buttons to narrow down your search to the IDoc you are searching for.',
      '6.  Click anywhere on the row (except for the checkbox) corresponding to the IDoc to be navigated to a new page to view each error associated with that IDoc.',
      '7.  Click the "Back" button to return to the search results screen.',
    ],
  },
  {
    id: 2,
    title: 'Reprocess an Errored IDoc',
    instructions: [
      '1.  On the landing page, conduct a search by populating the mandatory creation date filters, entering any applicable search parameter names and values into the search bar, and clicking "Search".',
      '2.  On the search results page, select one Errored IDoc with "Status" field value of "Open" or "In Progress" and with a "Reprocess from CILL Flag" field value of "X" using the checkbox.',
      '3.  Click the "Reprocess IDocs in CILL" button in the header of the search results page.',
      '4.  Select one level of transformation for reprocessing the IDoc:',
      '    •  Reprocessing with transformation should reprocess the selected IDoc through the JE layer.',
      '    •  Reprocessing with no transformation should reprocess the selected IDoc from CILL SAP Gateway.',
      '5.  Click the "Submit" button. On the search results screen, the IDoc "Status" should update to "Completed".',
    ],
  },
  {
    id: 3,
    title: 'Update an Errored IDoc Due to Manual Postings in S/4',
    instructions: [
      '1.  On the landing page, conduct a search by populating the mandatory creation date filters, entering any applicable search parameter names and values into the search bar, and clicking "Search".',
      '2.  On the search results page, select one Errored IDoc with "Status" field value of "Open" or "In Progress" and with a "Reprocess from CILL Flag" field value of blank using the checkbox.',
      '3.  Click the "Edit" button in the header of the search results page.',
      '4.  Enter the corresponding values for "SAP Document Number", "Document Date", and "Posting Date" for the selected IDoc.',
      '5.  Enter a detailed comment (less than 500 characters) in the text box.',
      '6.  Check the "Mark as Complete" checkbox.',
      '7.  Click the "Submit" button. On the search results screen, the IDoc "Status" should update to "Completed".',
      '8.  Alternatively, click the "Save" button to save your updates without submitting so you can return to the record later to make further updates. On the search results screen, the Errored IDoc "Status" should update to "In Progress".',
    ],
  },
  {
    id: 4,
    title: 'Edit Source Attributes for Internal CILL Errors',
    instructions: [
      '1.  On the landing page, conduct a search by populating the mandatory creation date filters, entering the CILL Error Codes assigned for Invalid Source Attributes in a file which causes XREF lookup to fail, and clicking "Search".',
      '    The applicable error codes include:',
      '        •  REF_DATA_ERR_012',
      '        •  REF_DATA_ERR_003',
      '        •  REF_DATA_ERR_009 ',
      '        •  REF_DATA_ERR_001',
      '        •  REF_DATA_ERR_011',
      '        •  REF_DATA_ERR_010',
      '        •  REF_DATA_ERR_015',
      '        •  REF_DATA_ERR_005',
      '2.   On the search results page, select one CILL error that matches the Error Codes searched for using the checkbox.',
      '3.   Click the "Edit" button in the header of the search results page.',
      '4.   Enter the corresponding new value for at least one of the "Legacy Account", "Division Number", or "Store Number" fields and select from the dropdown of suggested values.',
      '5.   Enter a detailed comment (less than 500 characters) in the text box (optional).',
      '6.   Click the "Submit" button. On the search results screen, the CILL Error "Status" should update to "Completed".',
      '7.   Alternatively, click the "Save" button to save your updates without submitting the CILL Error for processing so you can return to the record later to make further updates. On the search results screen, the CILL Error "Status" should update to "In Progress".',
    ],
  },
];
const Help = () => {
  // Specifies which panel should be open
  const [activeKey, setActiveKey] = useState(null);
  // Stores the search bar/select user input
  const [searchQuery, setSearchQuery] = useState(null);
  // Specifies the state of the search bar dropdown
  const [dropdownOpened, setDropdownOpened] = useState(false);
  /**
   * Function used to filter the options inside the dropdown. It checks the
   * title of the instruction and its instructions.
   *
   * @param {String} inputValue The search query entered by the user.
   * @param {Object} option    An object containing the information related to the option.
   */
  const filterOptions = (inputValue, option) => {
    // Create a single string containing all the instructions
    const instructions = helpInfo[option['data-index']].instructions.join(' - ').toUpperCase();
    const title = option.children.toUpperCase();
    // Normalize the user input
    const normalizedInputValue = inputValue.toUpperCase();
    return title.includes(normalizedInputValue) || instructions.includes(normalizedInputValue);
  };
  /**
   * Function that stores the user input in the search bar and opens the
   * search bar dropdown only if the user has typed something.
   *
   * @param {string} userInput The text typed by the user in the search bar.
   */
  const onSearch = (userInput) => {
    if (userInput) {
      setDropdownOpened(true);
      setSearchQuery(userInput.toUpperCase());
      return;
    }
    setDropdownOpened(false);
  };
  /**
   * Function in charge of setting the key of the option selected by the user
   * and then closes the dropdown.
   *
   * @param {Integer} key The key of the option selected/clicked by the user.
   */
  const onSelect = (key) => {
    setActiveKey(key);
    setDropdownOpened(false);
  };
  return (
    <div className="help">
      <Title level={1} className="help__title">
        Help Center
      </Title>
      <Text className="help__instructions">Select your question by using the search box</Text>
      <Select
        showSearch
        placeholder="What do you want to search?"
        notFoundContent={!searchQuery ? null : 'Content not found'}
        onSelect={(key) => onSelect(key)}
        onBlur={() => setDropdownOpened(false)}
        style={{ display: 'block', width: '60%', marginTop: '15px' }}
        defaultActiveFirstOption={false}
        showArrow={true}
        filterOption={filterOptions}
        onSearch={(e) => onSearch(e)}
        suffixIcon={<SearchOutlined />}
        allowClear
        className="help__search_box"
        open={dropdownOpened}
      >
        {helpInfo.map((option, option_index) => (
          <Option key={`instruction_${option.id}`} value={option.id} data-index={option_index}>
            {option.title}
          </Option>
        ))}
      </Select>
      <Collapse
        className="help__collapse-panel"
        ghost
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        expandIconPosition={'right'}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined className="help__collapse-panel-icon" rotate={isActive ? -90 : 90} />
        )}
        accordion
      >
        {helpInfo.map(({ id, title, instructions }) => {
          return (
            <Panel className="help__collapse-panel-title" header={title} key={id}>
              {instructions.map((description) => {
                return (
                  <Paragraph key={description} className="help__collapse-panel-description">
                    {description}
                  </Paragraph>
                );
              })}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};
export default Help;
