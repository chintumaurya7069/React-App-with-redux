import { createSlice } from "@reduxjs/toolkit";
import { addCart, getCartData } from "./cartThunkApp";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    cartData: [],
    error: null,
    loading: false,
    mainLoader: false,
    deleteLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Insert cart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = [...state.userData, action.payload];
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Fetch cart
      .addCase(getCartData.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.cartData = action.payload;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.mainLoader = false;
        state.error = action.payload?.message || action.error.message;
      });

    //   // Edit user
    //   .addCase(editUser.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(editUser.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const updatedUser = action.payload;

    //     if (!updatedUser || !updatedUser._id) {
    //       console.warn("No user data returned from editUser");
    //       return;
    //     }
    //     const index = state.userData.findIndex(
    //       (user) => user._id === updatedUser._id
    //     );
    //     if (index !== -1) {
    //       state.userData[index] = { ...state.userData[index], ...updatedUser };
    //     }
    //   })
    //   .addCase(editUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload?.message || action.error.message;
    //   })

    //   //delete
    //   .addCase(removeUser.pending, (state) => {
    //     state.deleteLoading = true;
    //   })
    //   .addCase(removeUser.fulfilled, (state, action) => {
    //     state.deleteLoading = false;
    //     const userId = action.payload.userId;
    //     state.userData = state.userData.filter((user) => user._id !== userId);
    //   })

    //   .addCase(removeUser.rejected, (state, action) => {
    //     state.deleteLoading = false;
    //     state.error = action.payload || action.error.message;
    //   });
  },
});
export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
