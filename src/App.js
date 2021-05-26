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
