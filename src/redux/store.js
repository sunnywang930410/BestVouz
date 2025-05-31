import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import colorReducer from "./colorSlice";
import storage from 'redux-persist/lib/storage'; // 使用 localStorage
import { persistReducer, persistStore } from "redux-persist";
import usersReducer from "./usersSlice";

const persistConfig = {
    key: 'shoppingCart',
    storage,
};

const usersPersistConfig = {
    key: 'users',
    storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);
export const store = configureStore(
    {
        reducer: {
            cart: persistedCartReducer,
            color: colorReducer,
            users: persistedUsersReducer
        },
        devTools: process.env.NODE_ENV !== 'production',

        //  關掉網頁後，重新打開網頁，東西還會在
        // globalstate會需要他
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: {
                    // 如果用 redux-persist，需要忽略這些 action
                    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                },
            }),
    }
)

export const persistor = persistStore(store);