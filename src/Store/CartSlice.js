import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
  selectItem: '',
  quanity: 0,
  tax: 21, // CONST
  total: 0,
};

const refreshLocalStorage = (state) =>
  localStorage.setItem('cart', JSON.stringify(state.cart));

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuanity: (state, action) => {
      state.quanity = action.payload;
    },

    updateTotal: (state, action) => {
      state.total = action.payload;
    },

    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.item.id === action.payload.item.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      refreshLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.item.id === action.payload);
      item.quantity++;
      refreshLocalStorage(state);
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.item.id === action.payload);
      if (item.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) => item.item.id !== action.payload
        );
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
      refreshLocalStorage(state);
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.item.id !== action.payload
      );
      state.cart = removeItem;
      refreshLocalStorage(state);
    },
    selectItem(state, action) {
      state.selectItem = action.payload;
      refreshLocalStorage(state);
    },
    selectAttributes(state, action) {
      // this.props.selectAttributes([itemId, name, e.id])

      const itemIndex = state.cart.findIndex(
        (e) => e.item.id === action.payload[0]
      );
      const attrIndex = state.cart[itemIndex].attributes.findIndex(
        (e) => e.name === action.payload[1]
      );
      state.cart[itemIndex].attributes[attrIndex].selected = action.payload[2];
      refreshLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  selectItem,
  selectAttributes,
  incrementQuantity,
  decrementQuantity,
  updateQuanity,
  updateTotal,
} = cartSlice.actions;
