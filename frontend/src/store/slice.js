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
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/product/${id}`);
            console.log("Product data from API:", response.data);
            return response.data;
        } catch (error) {
            console.error(
                "Failed to fetch product by ID:",
                error.response?.data || error.message
            );
            return rejectWithValue(error.response?.data);
        }
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
                console.log(
                    "Reducer getProductById.fulfilled - Payload:",
                    action.payload
                );
                state.loading = false;
                state.product = action.payload.data;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.product = null;
            });
    },
});

export default slice.reducer;
