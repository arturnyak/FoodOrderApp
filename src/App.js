import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartModalShow, setCartModalShow] = useState(false);
  

  const cartShowHandler = () => {
    setCartModalShow(true);
  };

  const cartHideHandler = () => {
    setCartModalShow(false);
  };

  return (
    <CartProvider>
      {cartModalShow && <Cart onClose={cartHideHandler} />}
      <Header onClick={cartShowHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
