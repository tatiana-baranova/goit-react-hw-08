import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const configAPI = {
    baseURL: 'https://connections-api.goit.global',
    timeout: 2000,
};

export const api = axios.create(configAPI);

// axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = token => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const clearAuthHeader = () => {
    api.defaults.headers.common.Authorization = '';
};

// export const register = createAsyncThunk(
//     'auth/register',
//     async (credentials, thunkAPI) =>
//     api.post('/users/signup', credentials)
//             .then(({ data }) => {
//                 setAuthHeader(data.token);
//                 return data;
//             })
//             .catch(error => thunkAPI.rejectWithValue(error.message))
// );
export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await api.post('/users/signup', credentials);
            setAuthHeader(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await api.post('/users/login', credentials);
            setAuthHeader(data.token); 
            return data;
        } catch (error) {
            console.error('Login error:', error.response); 
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
// export const logIn = createAsyncThunk(
//     'auth/login',
//     async (credentials, thunkAPI) =>
//         api.post('/users/login', credentials)
//             .then(({ data }) => {
//                 setAuthHeader(data.token);
//                 return data;
//             })
//             .catch(error => thunkAPI.rejectWithValue(error.message))
// );

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await api.post('/users/logout');
        clearAuthHeader()
    } catch (error) {
        console.error('Logout error:', error.response); 
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
});
// export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//     api.post('/users/logout')
//         .then(() => clearAuthHeader())
//         .catch(error => thunkAPI.rejectWithValue(error.message))
    
// });

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const storedToken = state.auth.token;

    if (!storedToken) {
        return thunkAPI.rejectWithValue("User isn't logged in");
    }

    try {
        setAuthHeader(storedToken);
        const { data } = await api.get('/users/current');
        return data;
    } catch (error) {
        console.error('Refresh user error:', error.response);
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to refresh user');
    }
});

// export const refreshUser = createAsyncThunk('auth/refresh',
//     async (_, thunkAPI) => {
//         const state = thunkAPI.getState();
//         const storedToken = state.auth.token;

//         if (!storedToken) return thunkAPI.rejectWithValue("User isn't logged in");
//         setAuthHeader(storedToken);
//         return api
//             .get('/users/current')
//             .then(({ data }) => data)
//             .catch(error => thunkAPI.rejectWithValue(error.message))
//     }
// );

