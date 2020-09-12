import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BookForm from '../src/components/BookForm';

Enzyme.configure({ adapter: new Adapter() });

const submitFunction = jest.fn();
const props = {
  disabled: false,
  onSubmit: submitFunction,
  autoSuggestProps: {
    suggestions: [],
    onSuggestionsFetchRequested: jest.fn(),
    onSuggestionsClearRequested: jest.fn(),
    getSuggestionValue: jest.fn(),
    renderSuggestion: jest.fn(),
    inputProps: {
      value: '',
      onChange: jest.fn(),
    },
  },
};
const wrapper = shallow(<BookForm {...props} />);

describe('Book form', () => {
  it('renders a form', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  it('Form has an auto-suggestion input', () => {
    expect(wrapper.find('Autosuggest').length).toBe(1);
  });

  it('Form calls onSubmit handler', () => {
    wrapper.find('form').simulate('submit');
    expect(submitFunction).toHaveBeenCalled();
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });

  it('Form has a submit button', () => {
    expect(wrapper.find('input[type="submit"]').length).toBe(1);
  });
});
