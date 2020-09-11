import React from 'react';
import { func, number, string } from 'prop-types';

const CollectionRow = ({
  title,
  category,
  rentDuration,
  charges,
  numOfBooks,
  addNumOfBooks,
  addRentDays,
  removeFromCollection,
}) => (
  <div className='collections-row'>
    <span className='titleSpan'>{title}</span>
    <span className='category'>{category}</span>
    <input
      className='copies'
      name={title}
      onChange={addNumOfBooks}
      type='number'
      min='1'
      value={numOfBooks}
    />
    <input
      className='duration'
      name={title}
      onChange={addRentDays}
      type='number'
      min='1'
      value={rentDuration}
    />
    <span className='charges'>{charges}</span>
    <button
      name={title}
      type='button'
      onClick={removeFromCollection}
      className='action delete-btn'
    >
      Delete
    </button>
  </div>
  );

CollectionRow.propTypes = {
  title: string.isRequired,
  category: string.isRequired,
  charges: number.isRequired,
  rentDuration: number.isRequired,
  numOfBooks: number.isRequired,
  addNumOfBooks: func.isRequired,
  addRentDays: func.isRequired,
  removeFromCollection: func.isRequired,
};

export default CollectionRow;
