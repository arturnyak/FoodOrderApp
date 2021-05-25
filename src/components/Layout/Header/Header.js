import { Fragment } from "react";
import mealsImg from '../../../assets/meals.jpg';
import HeaderCartBtn from "../HeaderCartBtn/HeaderCartBtn";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
          <h1>Meals</h1>
          <HeaderCartBtn onClick={props.onClick} ></HeaderCartBtn>
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImg} alt="Table of meals" />
      </div>
    </Fragment>
  );
};

export default Header;
