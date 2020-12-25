import React from 'react';
import { Select, Collapse } from 'antd';
import { shallow, mount } from 'enzyme';
import Help from './Help';
import { CaretRightOutlined } from '@ant-design/icons';
import '../../../../spec/helpers/enzyme';
describe('Help Screen view', () => {
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<Help />);
    expect(wrapper).toBeDefined();
  });
  /**
   * <Select /> component unit tests
   */
  it('it must render a <Select />', () => {
    const wrapper = shallow(<Help />);
    expect(wrapper.find(Select).length).toBe(1);
  });
  it('when the user clicks on the search bar, no option in the dropdown is shown', () => {
    const wrapper = mount(<Help />);
    wrapper.find('div.ant-select-selector input').simulate('click');
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(0);
  });
  it('when the user types CILL on the search bar, 4 options are shown', () => {
    const wrapper = mount(<Help />);
    wrapper.find('div.ant-select-selector input').simulate('change', { target: { value: 'cill' } });
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(4);
  });
  it('the search results shown are independent of the case of the search input', () => {
    const wrapper = mount(<Help />);
    wrapper.find('div.ant-select-selector input').simulate('change', { target: { value: 'cill' } });
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(4);
    wrapper.find('div.ant-select-selector input').simulate('change', { target: { value: 'CilL' } });
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(4);
  });
  it('when the user types the title of an instruction, only that option is shown', () => {
    const wrapper = mount(<Help />);
    wrapper.find('div.ant-select-selector input').simulate('change', {
      target: { value: 'Search and View IDoc Error Details' },
    });
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(1);
    expect(wrapper.find('div.ant-select-item-option-content').text()).toContain(
      'Search and View IDoc Error Details',
    );
  });
  it('when the user types part of an instruction on the search bar, the matching options are shown', () => {
    const wrapper = mount(<Help />);
    wrapper
      .find('div.ant-select-selector input')
      .simulate('change', { target: { value: 'On the landing page, conduct' } });
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(3);
  });
  // regression test
  it('when the user types the last part of the last instruction, that option should be shown', () => {
    const wrapper = mount(<Help />);
    wrapper
      .find('div.ant-select-selector input')
      .simulate('change', {
        target: {
          value:
            'Alternatively, click the "Save" button to save your updates without submitting the CILL Error for processing so you can return to the record later to make further updates. On the search results screen, the CILL Error "Status" should update to "In Progress".',
        },
      });
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(1);
  });
  it('when the user types something in the search bar, and clicks on one option, that option is shown in the search bar', () => {
    const wrapper = mount(<Help />);
    wrapper.find('div.ant-select-selector input').simulate('change', {
      target: { value: 'Search and View IDoc Error Details' },
    });
    wrapper.find('div.ant-select-item-option-content').simulate('click');
    expect(wrapper.find('span.ant-select-selection-item').text()).toBe(
      'Search and View IDoc Error Details',
    );
  });
  /**
   * <Collapse /> component unit tests
   */
  it('it must render one <Collapse/> component', () => {
    const wrapper = shallow(<Help />);
    expect(wrapper.find(Collapse).length).toBe(1);
  });
  it('it must render four heading titles on <Collapse/> component', () => {
    const wrapper = mount(<Help />);
    expect(wrapper.find('div.ant-collapse-header').length).toBe(4);
  });
  it('it must validates className="help__collapse-panel" for <Collapse/> component', () => {
    const wrapper = mount(<Help />);
    expect(wrapper.find('div.help__collapse-panel').length).toBe(1);
  });
  it('it must validates className="help__collapse-panel-title" for <Panel/> titles', () => {
    const wrapper = mount(<Help />);
    expect(wrapper.find('div.help__collapse-panel-title').length).toBe(4);
  });
  it('when the user clicks on the first panel, and open the information content', () => {
    const wrapper = mount(<Help />);
    wrapper.find('span.help__collapse-panel-icon').at(1).simulate('click');
    expect(
      wrapper.find('div.ant-collapse-item.ant-collapse-item-active.help__collapse-panel-title')
        .length,
    ).toBe(1);
    expect(
      wrapper.find('div.ant-collapse-item.ant-collapse-item-active.help__collapse-panel-title')
        .length,
    ).not.toBe(2);
  });
  it('when the user clicks on any panel, and just only that is the active panel and close any other', () => {
    const wrapper = mount(<Help />);
    wrapper.find(CaretRightOutlined).at(1).simulate('click');
    wrapper.find(CaretRightOutlined).at(2).simulate('click');
    wrapper.find(CaretRightOutlined).at(3).simulate('click');
    expect(
      wrapper.find('div.ant-collapse-item.ant-collapse-item-active.help__collapse-panel-title')
        .length,
    ).toBe(1);
    expect(
      wrapper.find('div.ant-collapse-item.ant-collapse-item-active.help__collapse-panel-title')
        .length,
    ).not.toBe(2);
  });
});
