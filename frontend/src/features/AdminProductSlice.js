import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk('get/products', async (keyword = '', { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/product/get/all/${keyword}`,
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

export const fetchDeleteProduct = createAsyncThunk('delete/product', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            `/api/product/delete/${id}/`,
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

export const fetchCreateProduct = createAsyncThunk('create/product', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        console.log(config.headers);
        const { data } = await axios.post(
            '/api/product/create/',
            {},
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

export const fetchUpdateProduct = createAsyncThunk('update/product', async (product, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/product/update/${product.id}/`,
            product,
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

const adminProductSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        adminProducts: [],
        adminProductsStatus: 'idle',
        adminProductsError: null,

        deleteProduct: null,
        deleteProductStatus: 'idle',
        deleteProductError: null,

        createProduct: null,
        createProductStatus: 'idle',
        createProductError: null,

        updateProduct: null,
        updateProductStatus: 'idle',
        updateProductError: null
    },
    reducers: {
        resetDeleteProduct: (state) => {
            state.deleteProduct = null;
            state.deleteProductStatus = 'idle';
            state.deleteProductError = null
        },
        resetCreateProduct: (state) => {
            state.createProduct = null;
            state.createProductStatus = 'idle';
            state.createProductError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.adminProductsStatus = 'loading';
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.adminProductsStatus = 'succeeded';
                state.adminProducts = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.adminProductsStatus = 'failed';
                state.adminProductsError = action.error.message;
            })

            .addCase(fetchDeleteProduct.pending, (state) => {
                state.deleteProductStatus = 'loading';
            })
            .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
                state.deleteProductStatus = 'succeeded';
                state.deleteProduct = action.payload;
            })
            .addCase(fetchDeleteProduct.rejected, (state, action) => {
                state.deleteProductStatus = 'failed';
                state.deleteProductError = action.error.message;
            })

            .addCase(fetchCreateProduct.pending, (state) => {
                state.createProductStatus = 'loading';
            })
            .addCase(fetchCreateProduct.fulfilled, (state, action) => {
                state.createProductStatus = 'succeeded';
                state.createProduct = action.payload;
            })
            .addCase(fetchCreateProduct.rejected, (state, action) => {
                state.createProductStatus = 'failed';
                state.createProductError = action.error.message;
            })

            .addCase(fetchUpdateProduct.pending, (state) => {
                state.updateProductStatus = 'loading';
            })
            .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
                state.updateProductStatus = 'succeeded';
                state.updateProduct = action.payload;
            })
            .addCase(fetchUpdateProduct.rejected, (state, action) => {
                state.updateProductStatus = 'failed';
                state.updateProductError = action.error.message;
            })

    }
})

export const { resetDeleteProduct, resetCreateProduct } = adminProductSlice.actions
export default adminProductSlice.reducer