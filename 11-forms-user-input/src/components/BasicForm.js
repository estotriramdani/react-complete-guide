import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    valueInputChangeHandler: firstNameInputChangeHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    valueInputChangeHandler: lastNameInputChangeHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.trim() !== '');

  const formIsValid = !firstNameHasError && !lastNameHasError && !emailHasError;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (
      enteredEmail === '' ||
      enteredFirstName === '' ||
      enteredLastName === ''
    ) {
      return;
    }
    if (!formIsValid) {
      return;
    }
    firstNameReset();
    lastNameReset();
    emailReset();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={`form-control ${firstNameHasError && 'invalid'}`}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            onBlur={firstNameInputBlurHandler}
            onChange={firstNameInputChangeHandler}
            id="name"
            value={enteredFirstName}
          />
          {firstNameHasError && (
            <p className="error-text">Please enter a valid name</p>
          )}
        </div>
        <div className={`form-control ${lastNameHasError && 'invalid'}`}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onBlur={lastNameInputBlurHandler}
            onChange={lastNameInputChangeHandler}
            value={enteredLastName}
          />
          {lastNameHasError && (
            <p className="error-text">Please enter a valid name</p>
          )}
        </div>
      </div>
      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="email"
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
