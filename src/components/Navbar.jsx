import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => (
  <nav className='navbar navbar-dark navbar-expand-lg bg-primary p-3'>
    <div className='navbar-brand'>
      Note App
    </div>

    <ul className='navbar-nav'>
      <li className='nav-item'>
        <NavLink className="nav-link" to="/">Главная</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className="nav-link" to="/cart">Корзина</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className="nav-link" to="/about">Информация</NavLink>
      </li>
    </ul>
  </nav>
)