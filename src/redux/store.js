import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import contactsReducer from './contacts/slice'
import filtersReducer from './filters/slice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts'],
}

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
    reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register'],
        },
    }),
});


export const persistor = persistStore(store);
export default store;

// const store = configureStore({
//     reducer: {
//         contacts: contactsReducer,
//         filters: filtersReducer,
//         middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//         serializableCheck: {
//         ignoredActions: ['persist/PERSIST'], // Ігноруємо певні екшени
//         ignoredPaths: ['register'], // Якщо є поле register — ігноруємо його
//         },
//     }),
//     },
// });

// export const persistor = persistStore(store);
// export default store;