import React from 'react';
import { shallow, mount } from 'enzyme';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EditErrors from './EditErrors';
import '../../../../spec/helpers/enzyme';
const defaultProps = {
  isModalVisible: true,
  closeModal: jasmine.createSpy(),
};
describe('Edit Errors Modal', () => {
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<EditErrors {...defaultProps} />);
    expect(wrapper).toBeDefined();
  });
  it('when the user clicks on the add field, it should append the respective fields', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find('#editErrors__form div.ant-space').length).toBe(1);
    wrapper.find(PlusCircleOutlined).simulate('click');
    expect(wrapper.find('#editErrors__form div.ant-space').length).toBe(2);
  });
  it('when the user clicks on the delete row icon, it should delete the respective row of fields', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find('#editErrors__form div.ant-space').length).toBe(1);
    wrapper.find(MinusCircleOutlined).simulate('click');
    expect(wrapper.find('#editErrors__form div.ant-space').length).toBe(0);
  });
  it('when the users click on the cancel btn, the modal should close', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    const { closeModal } = defaultProps;
    wrapper.find('div.ant-modal-footer button').at(0).simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
  it('when the users click on the X btn, the modal should close', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    const { closeModal } = defaultProps;
    wrapper.find('button.ant-modal-close').simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});
