import React from 'react';
import { number } from 'prop-types';

const Charges = ({ charges }) => (
  <div className='totalCharges'>
    <span>Total Charges</span>
    <span>{`${charges}$`}</span>
  </div>
);

Charges.propTypes = {
  charges: number,
};

Charges.defaultProps = {
  charges: 0,
};

export default Charges;
