import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout/Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckout(true);
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item, i) => (
        <CartItem
          key={i}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderButtons = (
    <div className={styles.actions}>
      <Button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </Button>
      {hasItems && <Button className={styles.button} onClick={orderHandler}>Order</Button>}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && <Checkout onCancel={props.onClose} />}
      {!checkout && orderButtons}
    </Modal>
  );
};

export default Cart;
