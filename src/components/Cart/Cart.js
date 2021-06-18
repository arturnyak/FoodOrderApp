import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout/Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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
  };

  const submitOrderHandler = async (data) => {
    setIsSubmiting(true);
    await fetch("https://burder-builder-react.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        use: data,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

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
      {hasItems && (
        <Button className={styles.button} onClick={orderHandler}>
          Order
        </Button>
      )}
    </div>
  );

  const cartModal = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!checkout && orderButtons}
    </React.Fragment>
  );

  const modalIsSubmitted = (
    <React.Fragment>
      <p>Yo order submitted</p>
      <div className={styles.actions}>
      <Button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </Button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {isSubmiting && <p>Submitting your Request</p>}
      {didSubmit && !isSubmiting && modalIsSubmitted}
      {!isSubmiting && !didSubmit && cartModal}
    </Modal>
  );
};

export default Cart;
