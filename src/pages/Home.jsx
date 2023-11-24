import React, { Fragment } from 'react';

import { DatabaseContext } from '../context/database/databaseContext';

import { Products } from '../components/Products';
import { Form } from '../components/Form';
import { Loader } from '../components/Loader';

const Home = () => {
  const { fetchProducts, addProduct, products, loading } = React.useContext(DatabaseContext);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Form />
      <hr />
      {
        loading
          ? <Loader />
          : <Products products={products} onAdd={addProduct} />
      }

    </Fragment>
  )
}

export default Home