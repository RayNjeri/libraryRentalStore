import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Collection from './Collection';
import Charges from './Charges';
import { catalogue } from '../API/Catalogue.json';
import {
  defaultRentDuration,
  defaultBookCount,
  maxRentedBooks,
  welcomeMessage,
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

  setBookState = ({ target: { value: currentRead } }) => {
    this.setState({ currentRead});
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

  addNumOfBooks = ({ target: { name: book, value } }) => {
    if (value < 1) {
      this.showMessage('Minimum Number of books to be rented is 1', 'error');
      return;
    }
    const { myCollection } = this.state;
    const newCollection = Object.assign({}, myCollection);
    newCollection[book].numOfBooks = parseInt(value, 10);
    this.setState({ myCollection: newCollection }, () =>
      this.calculateCharge(book)
    );
  };

  addRentDays = ({ target: { name: book, value } }) => {
    if (value < 1) {
      this.showMessage('Minimum rent duration is one day', 'error');
      return;
    }
    const { myCollection } = this.state;
    const newCollection = Object.assign({}, myCollection);
    newCollection[book].rentDuration = parseInt(value, 10);
    this.setState({ myCollection: newCollection }, () =>
      this.calculateCharge(book)
    );
  };

  removeFromCollection = ({ target: { name: book } }) => {
    const { myCollection } = this.state;
    const newCollection = Object.assign({}, myCollection);
    delete newCollection[book];
    this.setState({ myCollection: newCollection });
  };

  calculateTotalCharges = (book) => {
    const { myCollection } = this.state;
    const newCollection = { ...myCollection };
    const {
      rentDuration,
      numOfBooks,
      rentCharge,
      minRentDuration,
      minimumCharge,
    } = myCollection[book];

    if (minRentDuration && minimumCharge) {
      newCollection[book].charge = minimumCharge;

      if (rentDuration > minRentDuration) {
        newCollection[book].charge +=
          (rentDuration - minRentDuration) * rentCharge * numOfBooks;
      }
    } else {
      newCollection[book].charge = rentDuration * rentCharge * numOfBooks;
    }

    this.setState({ myCollection: newCollection });
  };

  getTotalCharge = () => {
    let totalCharge = 0;
    const { myCollection } = this.state;
    Object.values(myCollection).forEach((book) => {
      totalCharge += book.charge;
    });
    return totalCharge;
  };

  render() {
    const {
      state,
      setBookState,
      addToCollection,
      addRentDays,
      addNumOfBooks,
      removeFromCollection,
      getTotalCharge,
    } = this;
    const { currentRead, myCollection } = state;

    const notEmptyCollection = Object.keys(myCollection).length > 0;
    const disableInputs = Object.keys(myCollection).length >= maxRentedBooks;

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
              <Collection
                removeFromCollection={removeFromCollection}
                addNumOfBooks={addNumOfBooks}
                addRentDays={addRentDays}
                books={myCollection}
              />
            )}
            {notEmptyCollection > 0 && <Charges charges={getTotalCharge()} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
