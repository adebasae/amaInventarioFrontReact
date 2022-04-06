import React, { useState, useEffect } from 'react';
import { Form, Image } from 'react-bootstrap';
import MaterialesService from '../../services/MaterialesService';
import ProductService from '../../services/ProductService';
import ListaMateriales from '../../components/ListaMateriales';

function NuevoProducto(props) {
  const { match } = props;
  const [producto, setProducto] = useState(null);
  const [materiales, setMateriales] = useState([]);

  const cargar = () => {
    console.log('cargar');
    ProductService.getProductById(match.params.id).then((res) => {
      console.log('res.data', res.data);

      if (res === null) {
        setProducto(null);
        return;
      }
      setProducto({
        ...res.data
      });
    });
    MaterialesService.getMaterialesByIdProducto(match.params.id).then((res) => {
      if (res === null) {
        setMateriales([]);
        return;
      }
      setMateriales(res.data);
    });
  };

  // primera carga
  useEffect(() => {
    cargar();
  }, []);

  const form =
    producto === null ? (
      <p>Ha ocurrido un error al cargar el producto</p>
    ) : (
      <div className="">
        <Form className="container-flex">
          <div style={{ flexGrow: 2 }}>
            <Form.Group className="mb-3 w-75 " controlId="">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="text" value={producto.imagen.src} />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="">
              <Image src={producto.imagen.src} alt="loading" />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={producto.nombre}
                placeholder="Nombre"
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Precio Venta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Precio Venta"
                defaultValue={0}
                value={producto.precioVenta}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Mano Obra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mano Obra"
                value={producto.manoObra}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Costo Indefinido</Form.Label>
              <Form.Control
                type="number"
                placeholder="Costo Definido"
                defaultValue={0}
                value={producto.costoIndefinido}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Ganancia Bruta</Form.Label>
              <Form.Control
                type="number"
                defaultValue={0}
                disabled
                value={producto.gananciaBruta}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Costo de Materiales</Form.Label>
              <Form.Control
                type="number"
                defaultValue={0}
                disabled
                value={producto.costoMateriales}
              />
            </Form.Group>
          </div>
        </Form>
      </div>
    );

  const listm =
    materiales.length === 0 ? null : (
      <ListaMateriales materiales={materiales} cargar={() => cargar} />
    );
  return (
    <>
      <section className="o-section--medium o-section--no-padding-top  o-section--no-padding-bottom section--background">
        <div className="container">
          <h1 className="titulo-seccion__title">Nuevo Producto</h1>
        </div>
      </section>
      <section className="o-section--large form-datos">
        <div className="container">{form}</div>
        <div className="container">{listm}</div>
      </section>
    </>
  );
}

export default NuevoProducto;
