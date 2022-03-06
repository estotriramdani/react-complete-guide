import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isTouched: nameIsTouched,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    isTouched: emailIsTouched,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.includes('@'));

  const nameInputIsInvalid = !nameIsValid && nameIsTouched;

  const emailInputIsInvalid = !emailIsValid && emailIsTouched;

  let formIsValid = nameIsValid && emailIsValid;

  const inputNameClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control ';

  const inputEmailClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid && !emailIsValid) {
      return;
    }

    nameReset();
    emailReset();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputNameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameHasError && (
          <p className="error-text">Please enter a valid name</p>
        )}
      </div>
      <div className={inputEmailClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
