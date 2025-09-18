import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./productThunkApp";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productData: [],
    singleProduct: null,
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
      //   // Insert user
      //   .addCase(insertUser.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(insertUser.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.userData = [...state.userData, action.payload];
      //   })
      //   .addCase(insertUser.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload?.message || action.error.message;
      //   })

      // Fetch product
      .addCase(fetchProducts.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.productData = action.payload;
        
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.mainLoader = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Fetch product By Id
      .addCase(fetchProductById.pending, (state) => {
        state.mainLoader = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.mainLoader = false;
        state.singleProduct = action.payload;
        
      })
      .addCase(fetchProductById.rejected, (state, action) => {
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
export const { clearError } = productSlice.actions;
export default productSlice.reducer;
