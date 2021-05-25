import styles from "./HeaderCartBtn.module.css";
import CartIcon from "../../Cart/CartIcon";
import Button from '../../UI/Button/Button';
const HeaderCartBtn = (props) => {
  return (
    <Button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
          <CartIcon />
      </span>
      <span >Your Cart</span>
      <span className={styles.badge}>
          {/* {props.totalAmount} */}4
      </span>
    </Button>
  );
};

export default HeaderCartBtn;
