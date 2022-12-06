import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <ul className="nav mb-3">
      <li className="nav-item">
        <NavLink
          to={'/'}
          className="nav-link"
          aria-current="page"
          href="#"
          exact
        >
          Main
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/login'} className="nav-link" href="#">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/users'} className="nav-link" href="#">
          Users
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/hooks'} className="nav-link" href="#">
          Hooks
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={'/mock-data'} className="nav-link" href="#">
          MockData
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
