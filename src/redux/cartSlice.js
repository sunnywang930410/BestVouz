import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [] };
const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: initialState,
        reducers: {
            addCartItems: (state, action) => {
                const item = action.payload;
                // 檢查目前購物車中 是否已經有這個商品（state.cartItem為目前購物車的陣列）
                const product = state.cartItems.find((x) => x.id === item.id)
                // 當加入的商品已存在
                if (!!product) {
                    // 把購物車中對應id的商品更新成新的item（取代掉）
                    const cartItems = state.cartItems.map((x) => x.id === product.id ? item : x);
                    state.cartItems = cartItems;
                }
                // 當加入的商品不存在，加入購物車
                else{
                    state.cartItems = [...state.cartItems, item];
                }
            },
            removeCartItems:(state, action) =>{
                state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            }
        },
    }
);

export const selectCartItems = (state) => state.cart.cartItems;
export const { addCartItems, removeCartItems } = cartSlice.actions;
export default cartSlice.reducer;