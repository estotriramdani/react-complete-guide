import { useState } from 'react';
import Chart from '../Chart/Chart';
import Card from '../UI/Card';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import ExpensesChart from './ExpensesChart';
import ExpensesFilter from './ExpensesFilter';
import Expenseslist from './ExpensesList';

export default function Expenses(props) {
  const [year, setYear] = useState('2022');

  const filteredExpenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear() === parseInt(year);
  });

  return (
    <Card className="expenses">
      <ExpensesFilter onChangeYear={setYear} selectedYear={year} />
      <ExpensesChart expenses={filteredExpenses} />
      <Expenseslist items={filteredExpenses} />
    </Card>
  );
}
