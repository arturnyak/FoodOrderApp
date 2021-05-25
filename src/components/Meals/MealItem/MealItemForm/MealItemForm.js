import styles from "./MealItemForm.module.css";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";

const MealItemForm = (props) => {
  return (
    <form className={styles.form}>
      <Input
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
