import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals/Meals";

const App = () => {
  const [cartModalShow, setCartModalShow] = useState(false);
  // const [cartModalHide, setCartModalHide] = useState(true);

  const cartShowHandler = () => {
    setCartModalShow(true);
  };

  const cartHideHandler = () => {
    setCartModalShow(false);
  };

  return (
    <Fragment>
      {cartModalShow && (
        <Cart onClose={cartHideHandler} />
      )}
      <Header onClick={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default App;

// const duplicateCount = text => {    https://github.com/arturnyak/FoodOrderApp.git

// }

// console.log(duplicateCount(""), 0);
// console.log(duplicateCount("abcde"), 0);
// console.log(duplicateCount("aabbcde"), 2);
// console.log(duplicateCount("aabBcde"), 2,"should ignore case");
// console.log(duplicateCount("Indivisibility"), 1)
// console.log(duplicateCount("Indivisibilities"), 2, "characters may not be adjacent")
