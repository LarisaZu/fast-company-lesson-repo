import React from 'react';

const Caret = ({ type }) => {
  return (
    <i
      className={'bi bi-caret' + (type === 'desc' ? '-down-fill' : '-up-fill')}
    ></i>
  );
};

export default Caret;
