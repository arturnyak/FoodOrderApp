import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import styles from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const getMeals = async () => {
      setLoadState(true);
      const response = await fetch(
        "https://burder-builder-react.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const mealsArr = [];

      for (const key in responseData) {
        mealsArr.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(mealsArr);
      setLoadState(false);
    };

    getMeals().catch((error) => {
      setLoadState(false);
      setHttpError(error.message);
    });
  }, []);

  if (loadState) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal, i) => (
    <MealItem
      key={i}
      id={meal.id}
      description={meal.description}
      price={meal.price}
      name={meal.name}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
