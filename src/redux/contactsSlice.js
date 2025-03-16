import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from './contactsOps';


const initialState = {
    items: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteContact.pending, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.meta.arg);
                state.loading = true;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.loading = false;
            })
            .addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled), (state) => {
                state.loading = false;
            })
            .addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected), (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Щось пішло не так";
            });
    }
});

const contactsReducer = contactsSlice.reducer;
export default contactsReducer;