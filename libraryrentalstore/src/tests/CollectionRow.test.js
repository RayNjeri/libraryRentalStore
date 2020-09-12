import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CollectionRow from '../components/CollectionsRow';

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
  return mount(<CollectionRow {...propsWithoutBooks} />);
};

const wrapper = mount(<CollectionRow {...props} />);

describe('Test CollectionRow component', () => {
  it('Collection should not have a collections-row when books are not available', () => {
    expect(wrapperWithoutBooks().find('.collections-row').length).toBe(0);
  });

  it('Collection should have a collections-row when books are available', () => {
    expect(wrapper.find('.collections-row').length).toBe(1);
  });
});
