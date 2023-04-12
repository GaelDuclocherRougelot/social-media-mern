import { Link, useLocation } from 'react-router-dom';
import mainLogo from './../../assets/logo.svg';
import './Header.scss';
import Button from '../Button/Button.jsx';

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <Link to="/">
        <img src={mainLogo} className="logo" width={60} alt="logo" />
      </Link>
      {location.pathname === '/' && (
        <Link to="/login" className="login__btn">
          <Button color="blue" title="Login" />
        </Link>
      )}
    </header>
  );
}
