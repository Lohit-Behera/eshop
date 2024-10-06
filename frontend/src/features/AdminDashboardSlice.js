import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./proxy";

export const fetchGetAdminDashboard = createAsyncThunk('get/stats', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `${baseUrl}/api/order/admin/dashboard/`,
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


const adminDashboardSlice = createSlice({
    name: 'admin/dashboard',
    initialState: {
        adminDashboard: {},
        adminDashboardStatus: 'idle',
        adminDashboardError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAdminDashboard.pending, (state) => {
                state.adminDashboardStatus = 'loading';
            })
            .addCase(fetchGetAdminDashboard.fulfilled, (state, action) => {
                state.adminDashboardStatus = 'succeeded';
                state.adminDashboard = action.payload;
            })
            .addCase(fetchGetAdminDashboard.rejected, (state, action) => {
                state.adminDashboardStatus = 'failed';
                state.adminDashboardError = action.payload;
            })
    },
})

export default adminDashboardSlice.reducer