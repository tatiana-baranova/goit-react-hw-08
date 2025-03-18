import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './contacts/slice'
import filtersReducer from './filters/slice'


const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        filters: filtersReducer,
    },
});

export default store;