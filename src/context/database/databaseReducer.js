import { SHOW_LOADER, ADD_PRODUCT, REMOVE_PRODUCT, FETCH_PRODUCTS, FETCH_CART_PRODUCTS } from "../types";

const handlers = {
    [SHOW_LOADER]: state => ({ ...state, loading: true }),
    [ADD_PRODUCT]: (state, { payload }) => ({ ...state, cart: [...state.cart, payload] }),
    [REMOVE_PRODUCT]: (state, { payload }) => ({
        ...state,
        cart: state.cart.filter(product => product.id !== payload)
    }),
    [FETCH_PRODUCTS]: (state, { payload }) => ({ ...state, products: payload, loading: false }),
    [FETCH_CART_PRODUCTS]: (state, { payload }) => ({ ...state, cart: payload, loading: false }),
    DEFAUTLS: state => state
}

export const databaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAUTLS;
    return handle(state, action);
}