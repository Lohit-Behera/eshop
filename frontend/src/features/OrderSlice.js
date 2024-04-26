import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
            '/api/order/create/',
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


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        orderStatus: 'idle',
        orderError: null
    },
    reducers: {
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
    }
});

export default orderSlice.reducer