import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import { SearchProvider } from './context/Search';
import { DropDownProvider } from './context/dropdownUserContext';
import { DropDownCategoryProvider } from './context/dropdownCategoriesContext';
import { CartProvider } from './context/Cart';
import {WishListProvider} from './context/WishList'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <DropDownProvider>
          <DropDownCategoryProvider>
            <CartProvider>
              <WishListProvider>
              <App />
              </WishListProvider>
            </CartProvider>
          </DropDownCategoryProvider>
        </DropDownProvider>
      </SearchProvider>
    </AuthProvider>
    </BrowserRouter>
);

