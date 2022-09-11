import useInput from "../hooks/use-input";

const isNotEmpty = (name) => name.trim() !== "";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const BasicForm = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const isFormValid = nameIsValid && lastNameIsValid && emailIsValid;

  const formSubmittedHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    console.log(enteredName, enteredLastName, enteredEmail);

    resetName();
    resetlastName();
    resetEmail();
  };

  const nameClasses = !nameInputHasError
    ? "form-control"
    : "form-control invalid";

  const lastNameClasses = !lastNameInputHasError
    ? "form-control"
    : "form-control invalid";

  const emailClasses = !emailInputHasError
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={formSubmittedHandler}>
      <div className="control-group">
        <div className={nameClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please provide a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
