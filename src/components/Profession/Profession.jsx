import PropTypes from 'prop-types';
import { useProfessions } from '../../hooks/useProfession';

const Profession = ({ id }) => {
  const { isLoading, getProfessionById } = useProfessions();

  const userProf = getProfessionById(id);

  return <>{!isLoading ? <p>{userProf.name}</p> : 'loading...'}</>;
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
