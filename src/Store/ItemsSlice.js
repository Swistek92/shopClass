import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: ['all'],
  currentCategory: 'all',
  currency: [],
  currentCurency: { label: 'USD', symbol: '$' },
  displayCurrencyModal: false,
  displayCartModal: false,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products = action.payload;
    },
    addCategories(state, action) {
      state.categories = action.payload;
    },
    changeCategory(state, action) {
      state.currentCategory = action.payload;
    },
    addCurrency(state, action) {
      state.currency = action.payload;
    },
    changeCurrency(state, action) {
      state.currentCurency = action.payload;
      console.log(action.payload);
    },
    toggleCurrencyModal(state) {
      state.displayCurrencyModal = !state.displayCurrencyModal;
    },
  },
});

export const {
  changeCurrency,
  addProducts,
  addCategories,
  changeCategory,
  addCurrency,
} = itemsSlice.actions;
