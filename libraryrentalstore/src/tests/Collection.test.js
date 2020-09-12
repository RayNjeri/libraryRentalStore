/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Collection from '../components/Collection';

Enzyme.configure({ adapter: new Adapter() });

const removeFromCollection = jest.fn();
const addNumOfBooks = jest.fn();
const addRentDays = jest.fn();
const props = {
  books: {
    firstBook: {
      rentCharge: 1.5,
      rentDuration: 1,
      numOfBooks: 2,
      category: 'RegularBooks',
    },
  },
  addNumOfBooks,
  removeFromCollection,
  addRentDays,
};

const wrapperWithoutBooks = () => {
  const propsWithoutBooks = { ...props };
  propsWithoutBooks.books = {};
  return mount(<Collection {...propsWithoutBooks} />);
};

const wrapper = mount(<Collection {...props} />);

describe('Test Collection component', () => {
  it('Collection should have a header row with 4 spans', () => {
    expect(wrapper.find('.collections-header').length).toBe(1);
    expect(wrapper.find('.collections-header').children().length).toBe(6);
  });


  it('Remove button should invoke removeFromCollection', () => {
    wrapper.find('button').simulate('click');
    expect(removeFromCollection).toHaveBeenCalled();
  });

  it('Changing the inputs invokes addRentDays / addNumOfBooks respectively', () => {
    wrapper.find('input').at(0).simulate('change');
    expect(addNumOfBooks).toHaveBeenCalled();

    wrapper.find('input').at(1).simulate('change');
    expect(addRentDays).toHaveBeenCalled();
  });
});
