import React from 'react';

const tagLine = 'Deciding what to read next?';
const tagLineText =
  'You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.';
export const defaultRentDuration = 1;
export const defaultBookCount = 1;
export const maxRentedBooks = 10;

export const welcomeMessage = () => (
  <div>
    <h1>{tagLine}</h1>
    {tagLineText}
  </div>
);

export const collectionRow = (title, rentDetails, rowNumber) => {
  const { rentDuration, numOfBooks } = rentDetails;
  return (
    <div key={rowNumber} className='myCollection'>
      <span>{rowNumber + 1}</span>
      <span className='titleSpan'>{title}</span>
      <span>{rentDuration}</span>
      <span>{numOfBooks}</span>
    </div>
  );
};

export const renderTotalCharge = totalCharge => (
  <div className='totalCharge'>
    <span>Total Charge</span>
    <span>{totalCharge}$</span>
  </div>
);
