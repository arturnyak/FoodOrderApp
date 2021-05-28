import { useRef } from "react";
import styles from "./MealItemForm.module.css";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();


  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    props.onAddToCart(+enteredAmount);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button>+ Add</Button>
    </form>
  );
};

export default MealItemForm;
