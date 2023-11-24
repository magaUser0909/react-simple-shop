import React from 'react'

export const Products = ({ products, onAdd }) => (
  <ul className="list-group products">
    {products.map(product => (
      <li className="list-group-item product" key={product.id}>
        <div className='description'>
          <img src={product.imageURL} alt="" />
          <div className='info'>
            <strong>{product.title}</strong>
            <span>{product.price} &#x20bd;</span>
          </div>
        </div>
        <button onClick={() => onAdd(product.id)} className='btn btn-success'>Добавить в корзину</button>
      </li>
    ))}
  </ul>
)