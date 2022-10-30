import PropTypes from 'prop-types';
import { components } from 'react-select';

const CustomMultiValueLabel = props => {
  return (
    <>
      {props.selectProps.name === 'qualities' ? (
        <span className={'bg-' + props.data.color}>
          <components.MultiValueLabel {...props} />
        </span>
      ) : (
        props.children
      )}
    </>
  );
};

export default CustomMultiValueLabel;
CustomMultiValueLabel.propTypes = {
  props: PropTypes.object,
};
