// import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';

function App() {

  return (
    <div className="App">
      <Header />
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;
