import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    selectedItemsID: []
};

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
                else {
                    state.cartItems = [...state.cartItems, item];
                }
            },
            removeCartItems: (state, action) => {
                state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            },
            clearCart: (state) => {
                state.cartItems = [];
            },
            toggleSelectItem: (state, action) => {
                const id = action.payload;
                // 如果已經有這個 id → 代表原本是「勾選」狀態 → 現在要「取消勾選」
                if (state.selectedItemsID.includes(id)) {
                    state.selectedItemsID = state.selectedItemsID.filter(itemid => itemid !== id)
                }
                // 如果沒有這個 id → 代表原本是「未勾選」 → 現在要「加入勾選」
                else {
                    state.selectedItemsID.push(id);
                }
            },
            updateQuantity: (state, action) => {
                const { id, quantities } = action.payload;
                state.cartItems = state.cartItems.map(item =>{
                    console.log(item.price,quantities)
                    return item.id === id
                        ? {
                            ...item,
                            quantities: quantities,
                            totalPrice: item.price * quantities
                        }
                        : item;
                }
                    
                );
            }
        },
    }
);

export const selectCartItems = (state) => state.cart.cartItems;
export const selectedItemsID = (state) => state.cart.selectedItemsID;
export const { addCartItems, removeCartItems, clearCart, toggleSelectItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;