import "./Button.scss";

export default function Button({ children, styleClasses, ...props }) {
  return (
    <button {...props} className={styleClasses}>
      {children}
    </button>
  );
}
