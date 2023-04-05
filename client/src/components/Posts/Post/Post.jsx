import './Post.scss';
import heart from '../../../assets/heart.svg';
// import heartLiked from '../../../assets/heart-liked.svg';
import comment from '../../../assets/comment.svg';

import Button from '../../Button/Button.jsx';
export default function Post(props) {
  return (
    <div className="post">
      {/* User infos */}
      <div className="user__info">
        <img
          className="user__picture"
          src="https://res.cloudinary.com/dhiwunlet/image/upload/v1674747098/pictures/p466h8uizwvvkitgfc1u.jpg"
          alt="profile pic"
        />
        <h4 className="username">Finitix</h4>
        <Button color="blue" title="Follow" />
      </div>

      {/* Content */}
      {props.post.picture && (
        <img className="post__image" src={props.post.picture} alt="post img" />
      )}
      {/* Actions (like, comment) */}
      <div className="post__actions">
        <img className="like__icons" src={heart} width={50} alt="like icon" />
        {/* <img className="like__icons" src={heartLiked} width={50} alt="liked icon" /> */}
        <img
          className="like__icons"
          src={comment}
          width={50}
          alt="liked icon"
        />
      </div>

      <p className="post__title">{props.post.message}</p>
    </div>
  );
}
