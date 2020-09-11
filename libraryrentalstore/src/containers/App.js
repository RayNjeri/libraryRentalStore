import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { catalogue } from '../API/Catalogue.json';

import {
  defaultRentDuration,
  defaultBookCount,
  maxRentedBooks,
  welcomeMessage,
  collectionRow,
  renderTotalCharge,
} from './Utils';
import '../index.css';


let allBooks = [];
Object.keys(catalogue).forEach(genre => {
  const { books, rentCharge, minRentDuration, minimumCharge } = catalogue[genre];
  books.forEach(book => {
    book.rentCharge = rentCharge;
    book.genre = genre;
    if (minRentDuration) {
      book.minRentDuration = minRentDuration;
    }
    if (minRentDuration) {
      book.minimumCharge = minimumCharge;
    }
  });
  allBooks = [...allBooks, ...books];
});


class App extends Component {
  state = {
    currentRead: '',
    myCollection: {},
  };

  setBookState = (event, { newValue }) =>
    this.setState({ currentRead: newValue });

  calculateTotalCharges = () => {
    const { myCollection, rentRate } = this.state;
    let totalCharge = 0;
    Object.keys(myCollection).forEach((title) => {
      const { rentDuration, numOfBooks } = myCollection[title];
      totalCharge += rentDuration * rentRate * numOfBooks;
    });

    return totalCharge;
  };

  showMessage = (msg, state) => {
    switch (state) {
      case 'error':
        toast.error(msg);
        break;
      case 'warn':
        toast.warn(msg);
        break;
      default:
    }
  };

  addToCollection = (event) => {
    event.preventDefault();

    const { currentRead, myCollection } = this.state;
    if (!currentRead) {
      this.showMessage('Enter a valid book title', 'error');
      return;
    }
    if (!allBooks.find((book) => book.title === currentRead)) {
      this.showMessage('Sorry, The book is currently unavailable', 'error');
      return;
    }
    const newCollection = Object.assign({}, myCollection);

    if (newCollection[currentRead]) {
      newCollection[currentRead].numOfBooks += 1;
    } else {
      const bookDetails = allBooks.filter((x) => x.title === currentRead)[0];
      newCollection[currentRead] = {
        ...bookDetails,
        rentDuration: defaultRentDuration,
        numOfBooks: defaultBookCount,
      };
      this.setState({ myCollection: newCollection, currentRead: '' }, () =>
        this.calculateCharge(currentRead)
      );
    }
  };

  render() {
    const {
      addToCollection,
      setBookState,
      state,
      calculateTotalCharges,
    } = this;
    const { currentRead, myCollection } = state;

    const notEmptyCollection = Object.keys(myCollection).length > 0;
    const disableInputs = Object.keys(myCollection).length >= maxRentedBooks;
    const totalCharge = calculateTotalCharges();

    return (
      <div className='container'>
        <div className='welcomeMessage'>
          {welcomeMessage()}

          <div className='cover'>
            <form className='form' onSubmit={addToCollection}>
              <input
                type='search'
                auto-complete='library'
                disabled={disableInputs}
                value={currentRead}
                onChange={setBookState}
                placeholder='Meet your next book'
              />
              <input
                type='submit'
                disabled={disableInputs}
                value='Add to Collection'
              />
            </form>
            {notEmptyCollection && (
              <div>
                {Object.keys(myCollection)
                  .reverse()
                  .map((title, index) =>
                    collectionRow(title, myCollection[title], index)
                  )}
              </div>
            )}
            {totalCharge > 0 && renderTotalCharge(totalCharge)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
