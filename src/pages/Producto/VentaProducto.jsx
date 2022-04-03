import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import ProductService from '../../services/ProductService';

function VentaProducto() {
  // const [materiales, setMateriales] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoSelected, setProductoSelected] = useState();
  const [productoSelectedData, setProductoSelectedData] = useState();
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

  const cargarProducto = (id) => {
    ProductService.getProductById(id).then((res) => {
      setProductoSelectedData(res.data);
    });
  };

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
          <div>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Producto</Form.Label>
              <Select
                classNamePrefix="select "
                isSearchable
                name="color"
                options={productos}
                // onBlur={() => filtrar()}
                onChange={(e) => {
                  cargarProducto(e.value);
                }}
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
                  productoSelectedData === undefined
                    ? null
                    : productoSelectedData.precioVenta
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

          {productoSelectedData && (
            <>
              <div>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Venta: </Form.Label>
                  <Form.Label>
                    {productoSelectedData === undefined
                      ? null
                      : productoSelectedData.precioVenta}{' '}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Mano Obra:</Form.Label>
                  <Form.Label>200</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Gasto de Materiales</Form.Label>
                  <Form.Label>200</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Gasto Indefinido</Form.Label>
                  <Form.Label>200</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Ganancia Bruta</Form.Label>
                  <Form.Label>200</Form.Label>
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
                    onChange={(e) => {
                      cargarProducto(e.value);
                    }}
                    placeholder="Seleccione Producto..."
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Cantidad"
                    defaultValue={0}
                    value={
                      productoSelectedData === undefined
                        ? null
                        : productoSelectedData.precioVenta
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
            </>
          )}
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
