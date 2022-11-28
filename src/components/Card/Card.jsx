import PropTypes from 'prop-types';

const Card = ({ children, styles, bodyStyles }) => {
  return (
    <div className={'card' + (styles ? ' ' + styles : '')}>
      <div className={'card-body' + (bodyStyles ? ' ' + bodyStyles : '')}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  styles: PropTypes.string,
  bodyStyles: PropTypes.string,
};

export default Card;
