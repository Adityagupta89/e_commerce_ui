import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  totalAmount: 0,
  product: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addProduct(state, action) {
      let Product = action.payload.product;
      let size = action.payload.size;
      const updateTotalAmount = state.totalAmount + Product.price * size;
      const existingItemIndex = state.product.findIndex(
        (item) => item._id === Product._id
      );
      const existingItem = state.product[existingItemIndex];
      let updateItems;
      if (existingItem) {
        const updateItem = {
          ...existingItem,
          size: existingItem.size + size,
        };
        updateItems = [...state.product];
        updateItems[existingItemIndex] = updateItem;
      } else {
        updateItems = state.product.concat({ ...Product, size: size });
      }

      return {
        totalAmount: updateTotalAmount,
        product: updateItems,
      };
    },

    removeProduct(state, action) {
      const id = action.payload.id;
      const existItemIndex = state.product.findIndex((item) => item._id === id);
      const existItem = state.product[existItemIndex];
      const updateTotalAmount = state.totalAmount - existItem.price;
      let updateItems;
      if (existItem.size === 1) {
        updateItems = state.product.filter(
          (item) => item._id !== existItem._id
        );
      } else {
        const updateItem = { ...existItem, size: existItem.size - 1 };
        updateItems = [...state.product];
        updateItems[existItemIndex] = updateItem;
      }
      return {
        product: updateItems,
        totalAmount: updateTotalAmount,
      };
    },

    clearCart(state, action) {
      return initialCartState;
    },
  },
});
export const cartAction = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
