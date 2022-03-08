import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://react-http-3ec4f-default-rtdb.firebaseio.com/meals.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const transformedMeals = [];
      for (const key in resData) {
        transformedMeals.push({
          id: key,
          ...resData[key],
        });
      }
      setMeals(transformedMeals);
    };

    fetchMeals()
      .then((err) => {
        console.log(err);
        setError(err.message);
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsLoading}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList =
    meals.length > 0 &&
    meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList.length !== 0 && mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
