import { configureStore } from '@reduxjs/toolkit';
// import { userSlice } from './user-slice';
// import { modalSlice } from './modals-slice';
import { cartSlice } from './CartSlice';
import { itemsSlice } from './ItemsSlice';
const store = configureStore({
  reducer: { cart: cartSlice.reducer, items: itemsSlice.reducer },
});

export default store;
