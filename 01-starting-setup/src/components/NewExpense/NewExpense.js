import { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false);
  const expenseSaveHandler = (enteredData) => {
    const expenseData = {
      ...enteredData,
      id: Math.random(80123) * 100,
    };
    props.onSaveExpense(expenseData);
  };
  return (
    <div className="new-expense">
      {showForm ? (
        <ExpenseForm onSaveData={expenseSaveHandler} onCancel={setShowForm} />
      ) : (
        <button type="button" onClick={() => setShowForm(true)}>
          Add New Expense
        </button>
      )}
    </div>
  );
};

export default NewExpense;
