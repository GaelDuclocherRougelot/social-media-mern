import { useEffect, useState } from 'react'
import Post from './Post/Post.jsx';
import './Posts.scss';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/post')
    .then(res => res.json())
    .then(data => {
      setPosts(data);
    })
  });

  return (
    <section className="posts">
    {
      posts.map((post, index) => <Post key={index} post={post}/>)
    }
    </section>
  )
}