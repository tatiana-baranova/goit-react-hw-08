import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { api } from '../auth/operations'


export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get('/contacts');
            return data;
        } catch (error) {
            toast.error('No contacts found. Try again later.')
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
        try {
            const { data } = await api.post("/contacts", contact);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const { data } = await api.delete(`/contacts/${id}`);
            toast.success('The contact was successfully deleted!');
            return data;
        } catch (error) {
            toast.error(`Failed to delete contact. Try again later.${error}`);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);