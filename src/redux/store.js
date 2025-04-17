import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import colorReducer from "./colorSlice";

const store = configureStore(
    {
        reducer: {
            cart: cartReducer,
            color: colorReducer,
        }
    }
)

export default store;