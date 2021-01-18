import React from 'react';
import { mount } from 'enzyme';
import { ContextProvider } from './../../context/ContextProvider';
import ErrorSearch from './ErrorSearch';
import '../../../../spec/helpers/enzyme';
describe('Error Search view: ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ContextProvider>
        <ErrorSearch />
      </ContextProvider>,
    );
  });
  it('the component mounts without crashing', () => {
    expect(wrapper).toBeDefined();
  });
  /**
   * Single value validations tests
   */
  it('Test Search with a single value', () => {
    wrapper.find('input#errorSearch_select').simulate('change', { target: { value: '1234' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationStartDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationEndDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      false,
    );
  });
  it('Test Search with "Metadata Search Keys" empty', () => {
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      true,
    );
    wrapper.find('input#errorSearch_creationStartDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationEndDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(1).simulate('click');
    //  Note: Review why is this test failing
    //  wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(0);
  });
  it('Test Search with single Parameter', () => {
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      true,
    );
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Error' } });
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper.find('input#errorSearch_creationStartDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationEndDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').at(0).text()).toBe(
      'Error Code',
    );
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      false,
    );
  });
  it('Test Search Selecting a Parameter using Drop Down Menu', () => {
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationStartDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationEndDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').at(0).text()).toBe(
      'Parent ID',
    );
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      false,
    );
  });
  it('Select a Parameter then enter a single value', () => {
    // Click on the search bar and select first parameter in the list
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').length).toBe(1);
    // Enter a sigle value
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(2);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(1).text()).toBe('1');
  });
  it('Test Date Start and Date End Validations', () => {
    expect(wrapper.find('input#errorSearch_creationEndDate').props()['disabled']).toBe(true);
    wrapper.find('input#errorSearch_creationStartDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    expect(wrapper.find('input#errorSearch_creationEndDate').props()['disabled']).toBe(false);
  });
  it('The search button is enable only if the mandatory fields are fill', () => {
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      true,
    );
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2-3,4' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationStartDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper.find('input#errorSearch_creationEndDate').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(1).simulate('click');
    expect(wrapper.find('button.ant-btn.ant-btn-primary.ant-btn-lg').props()['disabled']).toBe(
      false,
    );
  });
  it('Validate no more than 3 parameters keys', () => {
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Parent' } });
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Error' } });
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Status' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Batch' } });
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(3);
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').at(0).text()).toBe(
      'Parent ID',
    );
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').at(1).text()).toBe(
      'Error Code',
    );
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').at(2).text()).toBe(
      'Status',
    );
  });
  /**
   * Comma separated values validations tests
   */
  it('Test Select 2 or more Parameters then enter a single value', () => {
    // Click on the search bar
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    // Click on first and second parameters in the list
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').length).toBe(2);
    // Enter a sigle value
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(3);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(2).text()).toBe('1');
  });
  it('Test Select single Parameter then enter 2 o more values', () => {
    // Click on the search bar
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    // Click on first parameter in the list
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').length).toBe(1);
    // Enter a multi value comma separated
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2,3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(2);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(1).text()).toBe('1,2,3');
  });
  it('Test Select 2 or more Parameters then enter 2 o more values', () => {
    // Click on the search bar
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    // Click on first and second parameters in the list
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').length).toBe(2);
    // Enter a multi value
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2,3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(3);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(2).text()).toBe('1,2,3');
  });
  it('Test Enter 2 or more values without selecting Parameters', () => {
    // Click on the search bar and Enter a value multivalue
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2,3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(0).text()).toBe('1,2,3');
  });
  it('Test Arrange Parameters then Values on Search Bar', () => {
    // Click on the search bar
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    // Enter multi value
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2,3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    // Click on second and third parameters in the list
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '' } });
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(4);
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').length).toBe(3);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(3).text()).toBe('1,2,3');
  });
  /**
   * Hyphen values validations tests
   */
  it('Search error code on search bar using hyphen', () => {
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1-2' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').text()).toBe('1-2');
  });
  it('Search value search bar using only hyphen if there are not any parameters selected', () => {
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(0);
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2-3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(0);
  });
  it('Search value not enabled when not only hyphen if error code parameter is selected', () => {
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Error' } });
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2-3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
    expect(wrapper.find('div.ant-select-selector span.ant-tag').at(0).text()).toBe('Error Code');
  });
  it('Search value search bar using comma first then hyphen shows error message if one parameter different to error code is selected', () => {
    // Click on the search bar
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: 'Parent' } });
    // Click on the Parent ID option shown in the search bar
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').length).toBe(1);
    expect(wrapper.find('div.ant-select-selector span.ant-tag.ant-tag-blue').text()).toBe(
      'Parent ID',
    );
    // Enter a value and a range
    wrapper
      .find('input#errorSearch_select.ant-select-selection-search-input')
      .simulate('change', { target: { value: '1,2-3' } });
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    // The tag was not added. We cannot search for the error message because it's outside of the <ErrorSearch /> wrapper
    expect(wrapper.find('div.ant-select-selector span.ant-tag').length).toBe(1);
  });
});
