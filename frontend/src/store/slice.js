// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const response = await axios.get("/api/products");
        return response.data;
    }
);

// Fetch product by ID
export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id) => {
        const response = await axios.get(`/api/product/${id}`);
        return response.data;
    }
);

const slice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: null, // For single product
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                console.log("Fetching products...");
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log("Products fetched successfully:", action.payload);
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle getProductById
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.product = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.product = null;
            });
    },
});

export default slice.reducer;
