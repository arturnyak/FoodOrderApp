import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      const existingItemId = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingItemId];
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemId] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
        items: updatedItems,
      };
    case "REMOVE_ITEMS":
      const existingCartItemId = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemId];
      let updatedCartItems;
      if (existingCartItem.amount === 1) {
        updatedCartItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedCartItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedCartItems = [...state.items];
        updatedCartItems[existingCartItemId] = updatedCartItem;
      }
      return {
        totalAmount: state.totalAmount - existingCartItem.price,
        items: updatedCartItems,
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEMS", item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEMS", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
