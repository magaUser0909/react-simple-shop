import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const CartProducts = ({ products, onRemove }) => (
  <TransitionGroup component="ul" className="list-group products cart">
    {products.map(product => (
      <CSSTransition
        key={product.id}
        classNames="product"
        timeout={800}
      >
        <li className="list-group-item product">
          <div className='description'>
            <img src={product.imageURL} alt="" />
            <strong>{product.title}</strong>
          </div>
          <button onClick={() => onRemove(product.id)} className='btn btn-danger'>Удалить</button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
)