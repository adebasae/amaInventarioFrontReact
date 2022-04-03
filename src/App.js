import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import './assets/scss/globals.scss';
import ListProduct from './pages/Producto/ListaProducto';
import NuevoProducto from './pages/Producto/NuevoProducto';
import ListItem from './components/ListItem';
import VentaProducto from './pages/Producto/VentaProducto';

function App() {
  const routes = (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={ListProduct} />
          <Route path="/nuevoProducto/:id" exact component={NuevoProducto} />
          <Route path="/ventaProducto" exact component={VentaProducto} />
          <Route path="/listItem" exact component={ListItem} />
        </Switch>
      </Layout>
    </Router>
  );
  return <div>{routes}</div>;
}

export default App;
