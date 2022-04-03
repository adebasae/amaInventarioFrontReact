import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { Form, Image } from 'react-bootstrap';
import ProductService from '../../services/ProductService';

function VentaProducto() {
  // const [materiales, setMateriales] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoSelected, setProductoSelected] = useState();
  const cargar = () => {
    ProductService.getProductToSelect().then((res) => {
      if (res === null) {
        setProductos([]);
        return;
      }
      setProductos(res.data);
    });
  };

  // primera carga
  useEffect(() => {
    cargar();
  }, []);

  useEffect(() => {
    if (productoSelected === undefined) return;
    ProductService.getProductById(productoSelected.id).then((res) => {
      if (res === null) {
        setProductoSelected(null);
        return;
      }
      setProductoSelected({
        ...res.data
      });
    });
  }, [productoSelected]);

  const form =
    productos.length === 0 ? (
      <p>Ha ocurrido un error al cargar los productos</p>
    ) : (
      <div className="">
        <Form className="container-flex">
          <div style={{ flexGrow: 2 }}>
            <Form.Group className="mb-3 w-75 " controlId="">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                value={
                  productoSelected === undefined
                    ? null
                    : productoSelected.imagen.src
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="">
              <Image
                src={
                  productoSelected === undefined
                    ? null
                    : productoSelected.imagen.src
                }
                alt="loading"
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Producto</Form.Label>
              <Select
                classNamePrefix="select "
                isSearchable
                name="color"
                options={productos}
                // onBlur={() => filtrar()}
                // onChange={(e: any) => {
                //   setSelectedPersons(e);
                // }}
                // isClearable
                placeholder="Seleccione Producto..."
                // value={selectedPersons}
                // id={`filtrarSemana${week}`}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cantidad"
                defaultValue={0}
                value={
                  productoSelected === undefined
                    ? null
                    : productoSelected.precioVenta
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                value={moment().format('YYYY-MM-DD')}
                disabled
              />
            </Form.Group>
          </div>
        </Form>
      </div>
    );

  return (
    <>
      <section className="o-section--medium o-section--no-padding-top  o-section--no-padding-bottom section--background">
        <div className="container">
          <h1 className="titulo-seccion__title">Venta de Producto</h1>
        </div>
      </section>
      <section className="o-section--large form-datos">
        <div className="container">{form}</div>
      </section>
    </>
  );
}

export default VentaProducto;
