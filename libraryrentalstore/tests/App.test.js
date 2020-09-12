import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/components/App';

Enzyme.configure({ adapter: new Adapter() });

import { Catalogue } from '../src/API/Catalogue.json';


const bookFixture = {
  firstBook: {
    rentCharge: 1.5,
    rentDuration: 1,
    numOfBooks: 2,
    category: 'RegularBooks',
  },
};

let wrapper;

describe('App component', () => {
   beforeEach(() => {
     wrapper = shallow(<App />);
   });

   afterEach(() => {
     wrapper = null;
   });

   it('Should render a container', () => {
     expect(wrapper.find('.container').length).toBe(1);
   });

  it('By default it should not render Collection and Charges components before books are added to collection', () => {
    expect(wrapper.find('Charges').length).toBe(0);
    expect(wrapper.find('Collection').length).toBe(0);
  });

   it('Should delete book/(s) from collection', () => {
     wrapper.setState({ myCollection: bookFixture });
     expect(wrapper.state().myCollection).toEqual(bookFixture);

     wrapper.instance().removeFromCollection({ target: { name: 'oneBook' } });
     expect(wrapper.state().myCollection).toEqual({});
   });

})
