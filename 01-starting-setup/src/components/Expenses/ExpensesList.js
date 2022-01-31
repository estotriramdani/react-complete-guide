import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const Expenseslist = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses</h2>;
  }
  return props.items.map((expense) => (
    <ExpenseItem
      key={expense.id}
      title={expense.title}
      date={expense.date}
      amount={expense.amount}
    />
  ));
};

export default Expenseslist;
