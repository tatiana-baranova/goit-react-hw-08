import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// axios.defaults.baseURL = 'https://67d09fa0825945773eb17e7f.mockapi.io/';
// axios.defaults.baseURL = 'https:connections-api.goit.global/';


export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('/contacts');
            return data;
        } catch (error) {
            toast.error('No contacts found. Try again later.')
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (body, thunkAPI) => {
        try {
            const { data } = await axios.post('/contacts', body);
            toast.success('The contact was added successfully!');
            return data;
        } catch (error) {
            toast.error(`Failed to add contact. Try again later.`);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/contacts/${id}`);
            toast.success('The contact was successfully deleted!');
            return data;
        } catch (error) {
            toast.error(`Failed to delete contact. Try again later.${error}`);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);