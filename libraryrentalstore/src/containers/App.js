import React, {Component} from 'react';
import {
  defaultRentDuration,
  defaultBookCount,
  maxRentedBooks,
  welcomeMessage,
  collectionRow,
  renderTotalCharge,
} from './Utils';
import '../index.css';


class App extends Component {
  state = {
    currentRead: '',
    myCollection: {
      Becoming: { rentDuration: 1, numOfBooks: 1 },
      Atomic: { rentDuration: 1, numOfBooks: 2 },
    },
    library: [],
    rentRate: 1,
  };

  setBookState = ({ target: { value: currentRead } }) => {
    this.setState({ currentRead });
  };

  calculateTotalCharges= () => {
    const { myCollection, rentRate } = this.state;
    let totalCharge = 0;
    Object.keys(myCollection).forEach((title) => {
      const { rentDuration, numOfBooks } = myCollection[title];
      totalCharge += rentDuration * rentRate * numOfBooks;
    });

    return totalCharge;
  };

  showMessage = msg => {};

  addToCollection = event => {
    event.preventDefault();
    const { currentRead, myCollection } = this.state;

    if (!currentRead) {
      this.showMessage('Enter a valid title');
      return;
    }

    let newCollection = Object.assign({}, myCollection);

    if (newCollection[currentRead]) {
      newCollection[currentRead].numOfBooks += 1;
    } else {
      newCollection[currentRead] = {
        rentDuration: defaultRentDuration,
        numOfBooks: defaultBookCount,
      };
    }

    this.setState({ myCollection: newCollection, currentRead: '' });
    this.calculateTotalCharges
  ();
  };
  render() {
    const {
      addToCollection,
      setBookState,
      state,
      calculateTotalCharges
      ,
    } = this;
    const { currentRead, myCollection } = state;

    const notEmptyCollection = Object.keys(myCollection).length > 0;
    const disableInputs = Object.keys(myCollection).length >= maxRentedBooks;
    const totalCharge = calculateTotalCharges
  ();

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
