import React from 'react';
import PropTypes from 'prop-types';

const SimpleComponent = ({ onLogin, onLogOut, isAuth }) => {
  const handleAuthBtnClick = () => {
    if (isAuth) {
      onLogOut();
    } else {
      onLogin();
    }
  };
  const className = isAuth ? 'btn-light' : 'btn-dark';
  return (
    <div>
      <button
        type="button"
        className={'btn ' + className + ' border border-2 border-dark'}
        onClick={handleAuthBtnClick}
      >
        {isAuth ? 'Выйти из системы' : 'Войти'}
      </button>
    </div>
  );
};

SimpleComponent.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default SimpleComponent;
