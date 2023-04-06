import './Button.scss';

export default function Header(props) {
  return (
    <button className={`${props.color} button`} type={props.type}>
      {
        props.title
      }
    </button>
  )
};