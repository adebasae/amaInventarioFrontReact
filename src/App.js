import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
// import logo from './logo.svg';

import './App.css';
// import Card from './components/Card';

import './assets/scss/globals.scss';
import ListProduct from './pages/ListaProducto';
import Details from './pages/Details';

function App() {
  const routes = (
    <Router>
      <Layout>
        <Switch>
          {/* detalles */}

          <Route path="/detalles/:id" component={Details} />

          {/* defautl */}

          <Route path="/" exact component={ListProduct} />
        </Switch>
      </Layout>
    </Router>
  );
  return <div>{routes}</div>;
}

export default App;
