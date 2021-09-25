import './Button.css';

function Button(props) {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

export default Button;
