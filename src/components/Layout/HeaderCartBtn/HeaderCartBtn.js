import { useContext, useState, useEffect } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./HeaderCartBtn.module.css";
import CartIcon from "../../Cart/CartIcon";
import Button from "../../UI/Button/Button";

const HeaderCartBtn = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = cartCtx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [items]);
  return (
    <>
      <Button className={btnStyles} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
      </Button>
    </>
  );
};

export default HeaderCartBtn;
