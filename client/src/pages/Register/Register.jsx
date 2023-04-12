import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import Header from '../../components/Header/Header';
import './Register.scss';

function Register() {

  return (
    <div className="Register">
      <Header />
      <main className='main__register'>
        <h1>Register</h1>
        <RegisterForm />
        <p>Already have an account?</p>
        <Link to='/login'>
          Login
        </Link>
      </main>
    </div>
  );
}

export default Register;