import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import './assets/scss/globals.scss';
import ListProduct from './pages/Producto/ListaProducto';
import Details from './pages/Producto/Details';
import NuevoProducto from './pages/Producto/NuevoProducto';

function App() {
  const routes = (
    <Router>
      <Layout>
        <Switch>
          {/* detalles */}

          <Route path="/detalles/:id" component={Details} />

          {/* defautl */}

          <Route path="/" exact component={ListProduct} />
          <Route path="/nuevoProducto" exact component={NuevoProducto} />
        </Switch>
      </Layout>
    </Router>
  );
  return <div>{routes}</div>;
}

export default App;
