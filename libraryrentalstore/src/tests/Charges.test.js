import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Charges from '../components/Charges';

Enzyme.configure({ adapter: new Adapter() });

const charges = '2';
const wrapper = shallow(<Charges charges={charges} />);

describe('Test Charges Component', () => {
  it("Should display the words 'Total Charge'", () => {
    expect(wrapper.html()).toContain('Total Charge');
  });

  it('Should display a total charges value', () => {
    expect(wrapper.html()).toContain(charges);
  });
});
