import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';

export default function Home() {
  return (
    <div className="Home">
    <Header />
      <main className="main__home">
        <Posts />
      </main>
    </div>
  )
}