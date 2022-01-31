import { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  const handleChangeForm = (event) => {
    const { id, value } = event.target;
    setUserInput((prevState) => {
      return { ...prevState, [id]: value };
    });
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const expenseData = {
      title: userInput.enteredTitle,
      amount: +userInput.enteredAmount,
      date: new Date(userInput.enteredDate),
    };
    props.onSaveData(expenseData);
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <div class="new-expense__controls">
        <div className="new-expense__control">
          <label htmlFor="enteredTitle">Title</label>
          <input
            onChange={(e) => handleChangeForm(e)}
            id="enteredTitle"
            type="text"
            value={userInput.enteredTitle}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="amount">Amount</label>
          <input
            onChange={(e) => handleChangeForm(e)}
            id="enteredAmount"
            type="number"
            min={0.01}
            step={0.01}
            value={userInput.enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="date">Date</label>
          <input
            onChange={(e) => handleChangeForm(e)}
            id="enteredDate"
            type="date"
            value={userInput.enteredDate}
          />
        </div>
      </div>
      <div class="new-expense__actions">
        <button type="button" onClick={() => props.onCancel(false)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
