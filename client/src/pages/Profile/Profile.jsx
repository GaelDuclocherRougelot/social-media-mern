import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Profile.scss';
export default function Profile() {
  useEffect(() => {
    console.log(window.localStorage.getItem('access_token'));
  }, []);
  return (
    <div className="profile">
    <Header />
      <main className='main__profile'>
        <h1>Profile page</h1>
      </main>
    </div>
  );
}
