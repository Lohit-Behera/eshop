import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetOrders = createAsyncThunk('get/orders', async (keyword = '', { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/order/get/all/${keyword}`,
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

export const fetchUpdateOrder = createAsyncThunk('update/order', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/order/update/${order.id}/`,
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

export const fetchDeleteOrder = createAsyncThunk('delete/order', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            `/api/order/delete/${id}/`,
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

const adminOrderSlice = createSlice({
    name: 'admin/order',
    initialState: {
        getAllOrder: null,
        getAllOrderStatus: 'idle',
        getAllOrderError: null,

        updateOrder: null,
        updateOrderStatus: 'idle',
        updateOrderError: null,

        deleteOrder: null,
        deleteOrderStatus: 'idle',
        deleteOrderError: null
    },
    reducers: {
        resetUpdateOrder: (state) => {
            state.updateOrder = null;
            state.updateOrderStatus = 'idle';
            state.updateOrderError = null;
        },
        resetDeleteOrder: (state) => {
            state.deleteOrder = null;
            state.deleteOrderStatus = 'idle';
            state.deleteOrderError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetOrders.pending, (state) => {
                state.getAllOrderStatus = 'loading';
            })
            .addCase(fetchGetOrders.fulfilled, (state, action) => {
                state.getAllOrder = action.payload;
                state.getAllOrderStatus = 'succeeded';
            })
            .addCase(fetchGetOrders.rejected, (state, action) => {
                state.getAllOrderStatus = 'failed';
                state.getAllOrderError = action.error.message;
            })

            .addCase(fetchUpdateOrder.pending, (state) => {
                state.updateOrderStatus = 'loading';
            })
            .addCase(fetchUpdateOrder.fulfilled, (state, action) => {
                state.updateOrder = action.payload;
                state.updateOrderStatus = 'succeeded';
            })
            .addCase(fetchUpdateOrder.rejected, (state, action) => {
                state.updateOrderStatus = 'failed';
                state.updateOrderError = action.error.message;
            })

            .addCase(fetchDeleteOrder.pending, (state) => {
                state.deleteOrderStatus = 'loading';
            })
            .addCase(fetchDeleteOrder.fulfilled, (state, action) => {
                state.deleteOrder = action.payload;
                state.deleteOrderStatus = 'succeeded';
            })
            .addCase(fetchDeleteOrder.rejected, (state, action) => {
                state.deleteOrderStatus = 'failed';
                state.deleteOrderError = action.error.message;
            })
    }
});

export const { resetUpdateOrder, resetDeleteOrder } = adminOrderSlice.actions
export default adminOrderSlice.reducer
