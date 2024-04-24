import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetProducts = createAsyncThunk('get/products', async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(
            '/api/product/',
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
})


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: null,
        productsStatus: 'idle',
        productsError: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetProducts.pending, (state) => {
                state.productsStatus = 'loading';
            })
            .addCase(fetchGetProducts.fulfilled, (state, action) => {
                state.productsStatus = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchGetProducts.rejected, (state, action) => {
                state.productsStatus = 'failed';
                state.productsError = action.payload;
            })
    }
})


export default productSlice.reducer