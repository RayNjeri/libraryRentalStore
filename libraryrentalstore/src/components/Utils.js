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



