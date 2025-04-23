

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload;
    },
    addCartItem: (state, action) => {
      const existingItem = state.cartItem.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        existingItem.qty += 1;
        existingItem.total = existingItem.price * existingItem.qty;
        toast.success("Quantity increased");
      } else {
        state.cartItem.push({
          ...action.payload,
          qty: 1,
          total: action.payload.price
        });
        toast.success("Added to cart");
      }
    },
    removeCartItem: (state, action) => {
      state.cartItem = state.cartItem.filter(item => item._id !== action.payload);
      toast.success("Removed from cart");
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItem.find(item => item._id === id);
      if (item) {
        item.qty = qty;
        item.total = item.price * qty;
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
    }
  }
});

export const { 
  setProducts, 
  addCartItem, 
  removeCartItem, 
  updateQuantity,
  clearCart 
} = productSlice.actions;

export default productSlice.reducer;