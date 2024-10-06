import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./proxy";

export const fetchAddAddress = createAsyncThunk('address/add', async (address, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
           `${baseUrl}/api/user/add/address/`,
            address,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch address');
    }
});

export const fetchGetAddress = createAsyncThunk('address/get', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${baseUrl}/api/user/get/address/`,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch address');
    }
});

export const fetchDeleteAddress = createAsyncThunk('address/delete', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            `${baseUrl}/api/user/delete/address/${id}`,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch address');
    }
});


const addressSlice = createSlice({
    name: 'address',
    initialState:{
        addAddress: null,
        addAddressStatus: 'idle',
        addAddressError: null,

        getAddress: null,
        getAddressStatus: 'idle',
        getAddressError: null,

        deleteAddress: null,
        deleteAddressStatus: 'idle',
        deleteAddressError: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddAddress.pending, (state) => {
                state.addAddressStatus = 'loading';
            })
            .addCase(fetchAddAddress.fulfilled, (state, action) => {
                state.addAddressStatus = 'succeeded';
                state.addAddress = action.payload;
            })
            .addCase(fetchAddAddress.rejected, (state, action) => {
                state.addAddressStatus = 'failed';
                state.addAddressError = action.error.message;
            })
            .addCase(fetchGetAddress.pending, (state) => {
                state.getAddressStatus = 'loading';
            })
            .addCase(fetchGetAddress.fulfilled, (state, action) => {
                state.getAddressStatus = 'succeeded';
                state.getAddress = action.payload;
            })
            .addCase(fetchGetAddress.rejected, (state, action) => {
                state.getAddressStatus = 'failed';
                state.getAddressError = action.error.message;
            })
            .addCase(fetchDeleteAddress.pending, (state) => {
                state.deleteAddressStatus = 'loading';
            })
            .addCase(fetchDeleteAddress.fulfilled, (state, action) => {
                state.deleteAddressStatus = 'succeeded';
                state.deleteAddress = action.payload;
            })
            .addCase(fetchDeleteAddress.rejected, (state, action) => {
                state.deleteAddressStatus = 'failed';
                state.deleteAddressError = action.error.message;
            })
    }
});

export default addressSlice.reducer