import React, { Fragment } from 'react'

import { DatabaseContext } from '../context/database/databaseContext'

import { Loader } from '../components/Loader';
import { CartProducts } from "../components/CartProducts";

const Cart = () => {
  const { showLoader, fetchCartProducts, removeProduct, cart, loading } = React.useContext(DatabaseContext);

  React.useEffect(() => {
    showLoader();
    window.setTimeout(fetchCartProducts, 500);
  }, []);

  return (
    <Fragment>
      {
        loading
          ? <Loader />
          : cart.length
            ? <CartProducts products={cart} onRemove={removeProduct} />
            : <p>Корзина пуста. Приобретите какой-то товар и он здесь появиться!</p>
      }
    </Fragment>
  )
}

export default Cart