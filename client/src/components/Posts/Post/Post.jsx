import './Post.scss';
import heartLiked from '../../../assets/heart-liked.png';
import comment from '../../../assets/comment.svg';
import followButton from '../../../assets/follow.png';

export default function Post(props) {
  return (
    <div className="post">
      {/* User infos */}
      <div className="user__info">
        <img
          className="user__picture"
          src="https://res.cloudinary.com/dhiwunlet/image/upload/v1674747098/pictures/p466h8uizwvvkitgfc1u.jpg"
          alt="profile pic"
          loading='lazy'
        />
        <h4 className="username">Finitix</h4>
        <img src={followButton} alt='follow button' />
      </div>

      {/* Content */}
      {props.post.picture && (
        <img className="post__image" src={props.post.picture} alt="post img" loading='lazy' />
      )}
      {/* Actions (like, comment) */}
      <div className="post__actions">
        <img className="like__icons" src={heartLiked} width={30} alt="like icon" />
        {/* <img className="like__icons" src={heartLiked} width={50} alt="liked icon" /> */}
        <img
          className="comment__icon"
          src={comment}
          width={35}
          alt="comment icon"
        />
      </div>

        <p className="post__title">{props.post.message}</p>
    </div>
  );
}
