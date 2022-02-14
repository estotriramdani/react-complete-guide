import classes from './Input.module.css';

const Input = ({ valid, id, label, onChange, onBlur, type, value }) => {
  return (
    <div
      className={`${classes.control} ${valid === false ? classes.invalid : ''}`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
