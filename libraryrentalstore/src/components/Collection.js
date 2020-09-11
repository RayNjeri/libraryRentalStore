import React, { Fragment } from 'react';
import { func, shape } from 'prop-types';

import CollectionRow from './CollectionsRow';

const Header= (
  <div className='collections-header'>
    <span className='titleSpan'>Book Title</span>
    <span className='genre'>Genre</span>
    <span className='book-copies'>Copies</span>
    <span className='rent-duration'>Duration (Days)</span>
    <span className='charges'>Charges</span>
    <span className='action' />
  </div>
);

const Collection = ({ books, addNumOfBooks, removeFromCollection, addRentDays }) => (
  <Fragment>
    {Header}
    {Object.keys(books)
      .reverse()
      .map((title, index) => (
        <CollectionRow
          key={index}
          addNumOfBooks={addNumOfBooks}
          addRentDays={addRentDays}
          removeFromCollection={removeFromCollection}
          title={title}
          index={index}
          {...books[title]}
        />
      ))}
  </Fragment>
);

Collection.propTypes = {
  books: shape({}).isRequired,
  addNumOfBooks: func.isRequired,
  removeFromCollection: func.isRequired,
  addRentDays: func.isRequired,
};

export default Collection;
