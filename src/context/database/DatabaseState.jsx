import React from 'react';

import axios from 'axios';

import { databaseReducer } from "./databaseReducer";
import { DatabaseContext } from "./databaseContext";
import { SHOW_LOADER, ADD_PRODUCT, REMOVE_PRODUCT, FETCH_PRODUCTS, FETCH_CART_PRODUCTS } from "../types";
import { AlertContext } from '../alert/alertContext';

const url = "https://react-simple-shop-21372-default-rtdb.europe-west1.firebasedatabase.app/";

export const DatabaseState = ({ children }) => {
  const alert = React.useContext(AlertContext);

  const initialState = {
    products: [],
    cart: [],
    loading: false
  }

  const [state, dispatch] = React.useReducer(databaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const addProduct = async (id) => {
    const payload = state.products.find(product => product.id === id);
    const res = await axios.get(`${url}/cart.json`);

    // Этот кусок кода отработает в том случае, если в res.data нету вообще ничего!
    if (!res.data) {
      await axios.post(`${url}/cart.json`, payload);
      dispatch({ type: ADD_PRODUCT, payload });
      return alert.show("Продукт успешно добавлен в корзину!", "success");
    }

    // В ином случае отработает этот кусок кода. Т.е, если в res.data есть что-то, и если в нем нету элемента который мы собираемся добавить в корзину, то тогда он добавится! 
    const products = Object.keys(res.data).map(key => res.data[key]);
    const findProduct = products.find(product => product.id === payload.id);
    if (!findProduct) {
      await axios.post(`${url}/cart.json`, payload);
      dispatch({ type: ADD_PRODUCT, payload });
      return alert.show("Продукт успешно добавлен в корзину!", "success");
    }

    // Иначе отработает этот кусок кода!
    alert.show("Данный продукт уже присутствует в корзине", "warning");
  }

  const removeProduct = async (payload) => {
    const res = await axios.get(`${url}/cart.json`);

    for (const i in res.data) {
      if (res.data[i].id === payload) {
        await axios.delete(`${url}/cart/${i}.json`);
      }
    }

    dispatch({ type: REMOVE_PRODUCT, payload });
  };

  const fetchProducts = async () => {
    showLoader();
    const res = await axios.get(`${url}/products.json`);

    const payload = await Object.keys(res.data)
      .map(product => res.data[product]);

    dispatch({ type: FETCH_PRODUCTS, payload });
  }

  const fetchCartProducts = async () => {
    const res = await axios.get(`${url}/cart.json`);

    if (res.data) {
      const payload = await Object.keys(res.data)
        .map(product => res.data[product]);

      dispatch({ type: FETCH_CART_PRODUCTS, payload });
    } else {
      // [] - это для того, чтобы когда в firebase не существует объект cart, при проверке на длину массива cart в компоненте Cart.jsx не выдавало ошибку из-за некорректного
      // использования свойства length
      dispatch({ type: FETCH_CART_PRODUCTS, payload: [] });
    }
  }

  return (
    <DatabaseContext.Provider value={{
      showLoader, fetchProducts, fetchCartProducts, addProduct, removeProduct,
      products: state.products,
      cart: state.cart,
      loading: state.loading
    }}>
      {children}
    </DatabaseContext.Provider>
  )
}