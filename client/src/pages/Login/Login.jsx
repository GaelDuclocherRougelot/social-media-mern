// import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import Header from '../../components/Header/Header';
import './Login.scss';

function Login() {

  return (
    <div className="Login">
      <Header />
      <main className='main__login'>
        <h1>Login</h1>
        <LoginForm />
        <p>Do not have an account yet ?</p>
        <Link to="/register">
          Register
        </Link>
      </main>
    </div>
  );
}

export default Login;