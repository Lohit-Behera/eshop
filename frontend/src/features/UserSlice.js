import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const { data } = await axios.post(
            '/api/user/login/',
            user,
            config
        );

        document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=${30 * 24 * 60 * 60};`;
        
        return data;
    } catch (error) {

        return rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
}

const userInfoCookie = getCookie('userInfo');

export const fetchRegister = createAsyncThunk('user/register', async (user, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const { data } = await axios.post(
            '/api/user/register/',
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
});

export const fetchUserDetails = createAsyncThunk('user/details', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/user/details/${id}/`,
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

export const fetchUserUpdate = createAsyncThunk('user/update', async (user, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/user/update/${user.id}/`,
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
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: userInfoCookie ? JSON.parse(userInfoCookie) : null,
        userInfoStatus: "idle",
        userInfoError: null,

        register: null,
        registerStatus: "idle",
        registerError: null,

        userDetails: null,
        userDetailsStatus: "idle",
        userDetailsError: null,

        userUpdate: null,
        userUpdateStatus: "idle",
        userUpdateError: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userInfo");
            state.userInfo = null;
            state.userInfoStatus = "idle";
            state.userInfoError = null;
        },
        resetRegister: (state) => {
            state.register = null;
            state.registerStatus = "idle";
            state.registerError = null;
        },
        resetUserUpdate: (state) => {
            state.userUpdate = null;
            state.userUpdateStatus = "idle";
            state.userUpdateError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.userInfoStatus = "loading";
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userInfoStatus = "succeeded";
                state.userInfo = action.payload;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.userInfoStatus = "failed";
                state.userInfoError = action.payload;
            })

            .addCase(fetchRegister.pending, (state) => {
                state.registerStatus = "loading";
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.registerStatus = "succeeded";
                state.register = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.registerStatus = "failed";
                state.registerError = action.payload;
            })

            .addCase(fetchUserDetails.pending, (state) => {
                state.userDetailsStatus = "loading";
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.userDetailsStatus = "succeeded";
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.userDetailsStatus = "failed";
                state.userDetailsError = action.payload;
            })

            .addCase(fetchUserUpdate.pending, (state) => {
                state.userUpdateStatus = "loading";
            })
            .addCase(fetchUserUpdate.fulfilled, (state, action) => {
                state.userUpdateStatus = "succeeded";
                state.userUpdate = action.payload;
            })
            .addCase(fetchUserUpdate.rejected, (state, action) => {
                state.userUpdateStatus = "failed";
                state.userUpdateError = action.payload;
            });
    },
});


export const { logout, resetRegister, resetUserUpdate } = userSlice.actions

export default userSlice.reducer