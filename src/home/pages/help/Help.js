import React, { useState } from 'react';
import { Collapse, Typography, Select } from 'antd';
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import helpInfo from '../../constants/helpInfo';
import './help.css';
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
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
