import styles from "./CartItem.module.css";
import Button from "../../UI/Button/Button";

const CartItem = (props) => {
  const price = `$${props.price}`;
  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>{props.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={props.onRemove}>-</Button>
        <Button onClick={props.onAdd}>+</Button>
      </div>
    </li>
  );
};

export default CartItem;
