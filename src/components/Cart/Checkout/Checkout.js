import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    setFormValidity({
      name: isEmpty(nameRef.current.value),
      street: isEmpty(streetRef.current.value),
      postal: isFiveChars(postalRef.current.value),
      city: isEmpty(cityRef.current.value),
    });
    const enteredName = isEmpty(nameRef.current.value);
    const enteredStreet = isEmpty(streetRef.current.value);
    const enteredPostal = isFiveChars(postalRef.current.value);
    const enteredCity = isEmpty(cityRef.current.value);

    const enteredInputsValidity =
      enteredName && enteredStreet && enteredPostal && enteredCity;
    if (enteredInputsValidity) {
      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div
        className={`${styles.control} ${
          formValidity.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>Enter Valid Name</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>Enter Valid Street</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.postal ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formValidity.postal && <p>Enter Valid Postal Code (5 Chars)</p>}
      </div>
      <div
        className={`${styles.control} ${
          formValidity.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>Enter Valid City</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
