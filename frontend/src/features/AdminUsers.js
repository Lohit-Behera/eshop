import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./proxy";

export const fetchGetAllUsers = createAsyncThunk('get/users', async (keyword, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `${baseUrl}/api/user/allusers/${keyword}`,
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

export const fetchGiveAdmin = createAsyncThunk('give/admin', async (user, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `${baseUrl}/api/user/useredit/${user.id}/`,
            user,
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

export const fetchRemoveAdmin = createAsyncThunk('remove/admin', async (user, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `${baseUrl}/api/user/useredit/${user.id}/`,
            user,
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

export const fetchDeleteUser = createAsyncThunk('delete/user', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            `${baseUrl}/api/user/userdelete/${id}/`,
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

const adminUserSlice = createSlice({
    name: 'admin/user',
    initialState: {
        allUsers: null,
        allUsersStatus: 'idle',
        allUsersError: null,

        admin: null,
        adminStatus: 'idle',
        adminError: null,

        removeAdmin: null,
        removeAdminStatus: 'idle',
        removeAdminError: null,

        deleteUser: null,
        deleteUserStatus: 'idle',
        deleteUserError: null,
    },
    reducers: {
        reset: (state) => {
            state.admin = null;
            state.adminStatus = 'idle';
            state.adminError = null;
            
            state.removeAdmin= 'null';
            state.removeAdminStatus = 'idle';
            state.removeAdminError = null;
            
            state.deleteUser = 'null';
            state.deleteUserStatus = 'idle';
            state.deleteUserError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllUsers.pending, (state) => {
                state.allUsersStatus = 'loading';
            })
            .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
                state.allUsersStatus = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(fetchGetAllUsers.rejected, (state, action) => {
                state.allUsersStatus = 'failed';
                state.allUsersError = action.payload;
            })

            .addCase(fetchGiveAdmin.pending, (state) => {
                state.adminStatus = 'loading';
            })
            .addCase(fetchGiveAdmin.fulfilled, (state, action) => {
                state.adminStatus = 'succeeded';
                state.admin = action.payload;
            })
            .addCase(fetchGiveAdmin.rejected, (state, action) => {
                state.adminStatus = 'failed';
                state.adminError = action.payload;
            })

            .addCase(fetchRemoveAdmin.pending, (state) => {
                state.removeAdminStatus = 'loading';
            })
            .addCase(fetchRemoveAdmin.fulfilled, (state, action) => {
                state.removeAdminStatus = 'succeeded';
                state.removeAdmin = action.payload;
            })
            .addCase(fetchRemoveAdmin.rejected, (state, action) => {
                state.removeAdminStatus = 'failed';
                state.removeAdminError = action.payload;
            })

            .addCase(fetchDeleteUser.pending, (state) => {
                state.deleteUserStatus = 'loading';
            })
            .addCase(fetchDeleteUser.fulfilled, (state, action) => {
                state.deleteUserStatus = 'succeeded';
                state.deleteUser = action.payload;
            })
            .addCase(fetchDeleteUser.rejected, (state, action) => {
                state.deleteUserStatus = 'failed';
                state.deleteUserError = action.payload;
            })
    }
})


export const { reset } = adminUserSlice.actions
export default adminUserSlice.reducer