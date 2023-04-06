// import { useState } from 'react';
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import Header from '../components/Header/Header';
import './Login.scss';

function Login() {

  return (
    <div className="App">
      <Header />
      <main className='main__login'>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </div>
  );
}

export default Login;