import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetProducts = createAsyncThunk('get/all/products', async (keyword = '', { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(
            `/api/product/${keyword}`,
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

export const fetchProductDetail = createAsyncThunk('get/product/detail', async (id, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(
            `/api/product/${id}/`,
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

        productDetail: null,
        productDetailStatus: 'idle',
        productDetailError: null
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

            .addCase(fetchProductDetail.pending, (state) => {
                state.productDetailStatus = 'loading';
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.productDetailStatus = 'succeeded';
                state.productDetail = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.productDetailStatus = 'failed';
                state.productDetailError = action.payload;
            })
    }
})


export default productSlice.reducer