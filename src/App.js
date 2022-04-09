import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import './assets/scss/globals.scss';
import ListProduct from './pages/Producto/ListaProducto';
import NuevoProducto from './pages/Producto/NuevoProducto';
// import ListItem from './components/ListItem';
import VentaProducto from './pages/Producto/VentaProducto';
import ListaMateriales from './components/ListaMateriales';

function App() {
  const routes = (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={ListProduct} />
          <Route path="/nuevoProducto/:id" component={NuevoProducto} />
          <Route path="/listaMateriales" component={ListaMateriales} />
          <Route path="/ventaProducto" component={VentaProducto} />
          {/* <Route path="/listItem"  component={ListItem} /> */}
        </Switch>
      </Layout>
    </Router>
  );
  return <div>{routes}</div>;
}

export default App;
