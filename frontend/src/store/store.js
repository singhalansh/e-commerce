import productReducers from './slice.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        products: productReducers,
    },
});
export default store;