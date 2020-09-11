import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import BookForm from './BookForm';
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
Object.keys(catalogue).forEach(category => {
  const { books, rentCharge, minRentDuration, minimumCharge } = catalogue[category];
  books.forEach(book => {
    book.rentCharge = rentCharge;
    book.category = category;
    if (minRentDuration) {
      book.minRentDuration = minRentDuration;
    }
    if (minRentDuration) {
      book.minimumCharge = minimumCharge;
    }
  });
  allBooks = [...allBooks, ...books];
});

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : allBooks.filter((book) =>
        book.title.toLowerCase().startsWith(inputValue)
      );
};

export const getSuggestionValue = (suggestion) => suggestion.title;

export const renderSuggestion = ({ title, category }) => `${title} - ${category}`;

class App extends Component {
  state = {
    currentRead: '',
    myCollection: {},
    suggestions: [],
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  };

  onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

  setBookState = (event, { newValue }) =>
    this.setState({ currentRead: newValue });

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
      this.showMessage('Sorry, The book in search is currently unavailable', 'error');
      return;
    }

    const newCollection = Object.assign({}, myCollection);
    console.log('xxxxxx', newCollection);

    if (newCollection[currentRead]) {
      newCollection[currentRead].numOfBooks += 1;
    } else {
      const bookDetails = allBooks.filter((x) => x.title === currentRead)[0];
      newCollection[currentRead] = {
        ...bookDetails,
        rentDuration: defaultRentDuration,
        numOfBooks: defaultBookCount,
      };
    }

    this.setState({ myCollection: newCollection, currentRead: '' }, () =>
      this.calculateTotalCharges(currentRead)
    );
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
      this.calculateTotalCharges(book)
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
      this.calculateTotalCharges(book)
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
      showMessage,
      addToCollection,
      addRentDays,
      addNumOfBooks,
      removeFromCollection,
      getTotalCharge,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
    } = this;
    const { currentRead, myCollection, suggestions } = state;

    console.log('powerrrrrr', state);

    const notEmptyCollection = Object.keys(myCollection).length > 0;
    const disableInputs = Object.keys(myCollection).length >= maxRentedBooks;

    if (disableInputs) {
      showMessage('Limit exceeded for books to be rented', 'warn');
    }

    const inputProps = {
      placeholder: 'Meet your next book',
      value: currentRead,
      onChange: setBookState,
      type: 'search',
    };

    const autoSuggestProps = {
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      inputProps,
    };

    return (
      <div className='container'>
        <div className='welcomeMessage'>
          {welcomeMessage()}

          <div>
            <ToastContainer position={toast.POSITION.TOP_CENTER} />
            <BookForm
              autoSuggestProps={autoSuggestProps}
              disabled={disableInputs}
              onSubmit={addToCollection}
            />
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
