import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink
          to={'/'}
          className="nav-link active"
          aria-current="page"
          href="#"
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
    </ul>
  );
};

export default Navigation;
