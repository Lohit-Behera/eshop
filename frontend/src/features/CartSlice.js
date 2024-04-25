import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCreateCart = createAsyncThunk('create/cart', async (item, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            '/api/product/create/cart/',
            item,
            config
        );
        return data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

export const fetchGetCart = createAsyncThunk('get/cart', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            '/api/product/get/cart/',
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

export const fetchDeleteCart = createAsyncThunk('delete/cart', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            `/api/product/delete/cart/${id}/`,
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


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        createCart: null,
        createCartStatus: 'idle',
        createCartError: null,

        getCart: null,
        getCartStatus: 'idle',
        getCartError: null,

        deleteCart: null,
        deleteCartStatus: 'idle',
        deleteCartError: null
    },
    reducers: {
        resetCreateCart: (state) => {
            state.createCart = null;
            state.createCartStatus = 'idle';
            state.createCartError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateCart.pending, (state) => {
                state.createCartStatus = 'loading';
            })
            .addCase(fetchCreateCart.fulfilled, (state, action) => {
                state.createCartStatus = 'succeeded';
                state.createCart = action.payload;
            })
            .addCase(fetchCreateCart.rejected, (state, action) => {
                state.createCartStatus = 'failed';
                state.createCartError = action.payload;
            })

            .addCase(fetchGetCart.pending, (state) => {
                state.getCartStatus = 'loading';
            })
            .addCase(fetchGetCart.fulfilled, (state, action) => {
                state.getCartStatus = 'succeeded';
                state.getCart = action.payload;
            })
            .addCase(fetchGetCart.rejected, (state, action) => {
                state.getCartStatus = 'failed';
                state.getCartError = action.payload;
            })

            .addCase(fetchDeleteCart.pending, (state) => {
                state.deleteCartStatus = 'loading';
            })
            .addCase(fetchDeleteCart.fulfilled, (state, action) => {
                state.deleteCartStatus = 'succeeded';
                state.deleteCart = action.payload;
            })
            .addCase(fetchDeleteCart.rejected, (state, action) => {
                state.deleteCartStatus = 'failed';
                state.deleteCartError = action.payload;
            })
    },
});

export const { resetCreateCart } = cartSlice.actions
export default cartSlice.reducer