import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ProductsProvider from "./contexts/ProductsContext";


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ProductsProvider>
    <App/>
  </ProductsProvider>
);
