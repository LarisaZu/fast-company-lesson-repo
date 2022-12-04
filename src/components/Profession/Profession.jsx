import { useContext } from 'react';
import PropTypes from 'prop-types';
import professionContext from '../../context/profession/professionContext';

const Profession = ({ id }) => {
  const { isLoading, getProfessionById } = useContext(professionContext);

  const userProf = getProfessionById(id);
  return <>{!isLoading ? <p>{userProf.name}</p> : 'loading...'}</>;
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
