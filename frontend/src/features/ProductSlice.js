import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./proxy";

export const fetchGetProducts = createAsyncThunk('get/all/products', async (keyword = '', { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(
            `${baseUrl}/api/product/${keyword}`,
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
            `${baseUrl}/api/product/${id}/`,
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

export const fetchTopProducts = createAsyncThunk('get/top/products', async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(
            `${baseUrl}/api/product/top/`,
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

export const fetchCreateReview = createAsyncThunk('create/review', async (review, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `${baseUrl}/api/product/create/review/${review.id}/`,
            review,
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
        productDetailError: null,

        topProducts: null,
        topProductsStatus: 'idle',
        topProductsError: null,

        createReview: null,
        createReviewStatus: 'idle',
        createReviewError: null,
    },
    reducers: {
        resetCreateReview: (state) => {
            state.createReview = null;
            state.createReviewStatus = 'idle';
            state.createReviewError = null;
        }
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

            .addCase(fetchTopProducts.pending, (state) => {
                state.topProductsStatus = 'loading';
            })
            .addCase(fetchTopProducts.fulfilled, (state, action) => {
                state.topProductsStatus = 'succeeded';
                state.topProducts = action.payload;
            })
            .addCase(fetchTopProducts.rejected, (state, action) => {
                state.topProductsStatus = 'failed';
                state.topProductsError = action.payload;
            })

            .addCase(fetchCreateReview.pending, (state) => {
                state.createReviewStatus = 'loading';
            })
            .addCase(fetchCreateReview.fulfilled, (state, action) => {
                state.createReviewStatus = 'succeeded';
                state.createReview = action.payload;
            })
            .addCase(fetchCreateReview.rejected, (state, action) => {
                state.createReviewStatus = 'failed';
                state.createReviewError = action.payload;
            })
    }
})

export const { resetCreateReview } = productSlice.actions
export default productSlice.reducer