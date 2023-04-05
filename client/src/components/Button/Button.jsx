import './Button.scss';

export default function Header(props) {
  return (
    <button className={`${props.color} button`}>
      {
        props.title
      }
    </button>
  )
};