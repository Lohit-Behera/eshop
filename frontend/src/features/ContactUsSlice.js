import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContactUs = createAsyncThunk('contactus', async (message, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.put(
            '/api/user/contactus/',
            message,
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

export const fetchContactUsGetAll = createAsyncThunk('contactus/get/all', async (keyword = '', { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/user/get/all/contactus/${keyword}`,
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

export const fetchContactUsGetById = createAsyncThunk('contactus/get/id', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/user/contactus/${id}/`,
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

export const fetchContactUsUpdate = createAsyncThunk('contactus/update', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/user/contactus/update/${id}/`,
            id,
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

const contactUsSlice = createSlice({
    name: 'contactus',
    initialState: {
        contactus: null,
        contactusStatus: 'idle',
        contactusError: null,

        getAllContactUs: null,
        getAllContactUsStatus: 'idle',
        getAllContactUsError: null,

        getContactUsById: null,
        getContactUsByIdStatus: 'idle',
        getContactUsByIdError: null,

        updateContactUs: null,
        updateContactUsStatus: 'idle',
        updateContactUsError: null
    },
    reducers: {
        resetContactUs: (state) => {
            state.contactus = null;
            state.contactusStatus = 'idle';
            state.contactusError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactUs.pending, (state) => {
                state.contactusStatus = 'loading';
            })
            .addCase(fetchContactUs.fulfilled, (state, action) => {
                state.contactusStatus = 'succeeded';
                state.contactus = action.payload;
            })
            .addCase(fetchContactUs.rejected, (state, action) => {
                state.contactusStatus = 'failed';
                state.contactusError = action.payload;
            })

            .addCase(fetchContactUsGetAll.pending, (state) => {
                state.getAllContactUsStatus = 'loading';
            })
            .addCase(fetchContactUsGetAll.fulfilled, (state, action) => {
                state.getAllContactUsStatus = 'succeeded';
                state.getAllContactUs = action.payload;
            })
            .addCase(fetchContactUsGetAll.rejected, (state, action) => {
                state.getAllContactUsStatus = 'failed';
                state.getAllContactUsError = action.payload;
            })

            .addCase(fetchContactUsGetById.pending, (state) => {
                state.getContactUsByIdStatus = 'loading';
            })
            .addCase(fetchContactUsGetById.fulfilled, (state, action) => {
                state.getContactUsByIdStatus = 'succeeded';
                state.getContactUsById = action.payload;
            })
            .addCase(fetchContactUsGetById.rejected, (state, action) => {
                state.getContactUsByIdStatus = 'failed';
                state.getContactUsByIdError = action.payload;
            })

            .addCase(fetchContactUsUpdate.pending, (state) => {
                state.updateContactUsStatus = 'loading';
            })
            .addCase(fetchContactUsUpdate.fulfilled, (state, action) => {
                state.updateContactUsStatus = 'succeeded';
                state.updateContactUs = action.payload;
            })
            .addCase(fetchContactUsUpdate.rejected, (state, action) => {
                state.updateContactUsStatus = 'failed';
                state.updateContactUsError = action.payload;
            })
    }
})

export const { resetContactUs } = contactUsSlice.actions
export default contactUsSlice.reducer