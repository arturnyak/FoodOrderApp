import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item, i) => (
        <li key={i}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <Button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </Button>
        <Button className={styles.button}>Order</Button>
      </div>
    </Modal>
  );
};

export default Cart;
