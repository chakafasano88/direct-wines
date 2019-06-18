import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import './App.scss';
import ProductList from './components/ProductList';  

function App() {
  return (
    <div className="App">
        <ProductList />          
    </div>
  );
}

export default App;
