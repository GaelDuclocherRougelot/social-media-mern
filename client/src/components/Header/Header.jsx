import { Link } from 'react-router-dom';
import mainLogo from './../../assets/logo.svg';
import './Header.scss';
import Button from '../Button/Button.jsx';

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={mainLogo} className='logo' width={60} alt="logo" /> 
      </Link>
      <Link to="/login" className='login__btn'>
        <Button color="blue" title="Login"/>
      </Link>
    </header>
  );
}
