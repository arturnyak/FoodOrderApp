import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./HeaderCartBtn.module.css";
import CartIcon from "../../Cart/CartIcon";
import Button from "../../UI/Button/Button";

const HeaderCartBtn = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);
  return (
    <>
      <Button className={styles.button} onClick={props.onClick}>
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
