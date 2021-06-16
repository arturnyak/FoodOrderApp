import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import styles from "./AvailableMeals.module.css";
import { useEffect, useReducer } from "react";

const initialState = {
  mealsValue: [],
  loadState: false,
  httpError: null,
};

const mealsStateReducer = (state, action) => {
  switch (action.type) {
    case "MEALS_STATE":
      return { mealsValue: action.mealsValue, loadState: action.loadState };
    case "LOAD_ERROR":
      return { httpError: action.httpError };
    default:
      return mealsStateReducer;
  }
};

const AvailableMeals = () => {
  const [mealState, dispatch] = useReducer(mealsStateReducer, initialState);

  useEffect(() => {
    const getMeals = async () => {
      dispatch({
        type: "MEALS_STATE",
        loadState: true,
      });
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
      dispatch({
        type: "MEALS_STATE",
        mealsValue: mealsArr,
        loadState: false,
      });
    };

    getMeals().catch((error) => {
      dispatch({
        type: "LOAD_ERROR",
        httpError: error.message,
        loadState: false,
      });
    });
  }, []);

  if (mealState.loadState) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (mealState.httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{mealState.httpError}</p>
      </section>
    );
  }

  const mealsList = mealState.mealsValue.map((meal, i) => (
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
