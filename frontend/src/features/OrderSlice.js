import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./proxy";

export const fetchCreateOrder = createAsyncThunk('create/order', async (order, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `${baseUrl}/api/order/create/`,
            order,
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
});

export const fetchGetOrderById = createAsyncThunk('get/order', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${baseUrl}/api/order/get/${id}/`,
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
});

export const fetchGetAllOrders = createAsyncThunk('get/all/orders', async (keyword = '', { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${baseUrl}/api/order/get/${keyword}`,
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
});


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        orderStatus: 'idle',
        orderError: null,

        getOrder: null,
        getOrderStatus: 'idle',
        getOrderError: null,

        getAllOrders: null,
        getAllOrdersStatus: 'idle',
        getAllOrdersError: null
    },
    reducers: {
        resetOrder: (state) => {
            state.order = null;
            state.orderStatus = 'idle';
            state.orderError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateOrder.pending, (state) => {
                state.orderStatus = 'loading';
            })
            .addCase(fetchCreateOrder.fulfilled, (state, action) => {
                state.orderStatus = 'succeeded';
                state.order = action.payload;
            })
            .addCase(fetchCreateOrder.rejected, (state, action) => {
                state.orderStatus = 'failed';
                state.orderError = action.error.message;
            })

            .addCase(fetchGetOrderById.pending, (state) => {
                state.getOrderStatus = 'loading';
            })
            .addCase(fetchGetOrderById.fulfilled, (state, action) => {
                state.getOrderStatus = 'succeeded';
                state.getOrder = action.payload;
            })
            .addCase(fetchGetOrderById.rejected, (state, action) => {
                state.getOrderStatus = 'failed';
                state.getOrderError = action.error.message;
            })

            .addCase(fetchGetAllOrders.pending, (state) => {
                state.getAllOrdersStatus = 'loading';
            })
            .addCase(fetchGetAllOrders.fulfilled, (state, action) => {
                state.getAllOrdersStatus = 'succeeded';
                state.getAllOrders = action.payload;
            })
            .addCase(fetchGetAllOrders.rejected, (state, action) => {
                state.getAllOrdersStatus = 'failed';
                state.getAllOrdersError = action.error.message;
            })
    }
});

export const { resetOrder } = orderSlice.actions
export default orderSlice.reducer