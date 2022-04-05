import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment';
import { Form, Card, Image } from 'react-bootstrap';
import ProductService from '../../services/ProductService';
import MaterialService from '../../services/MaterialesService';

function VentaProducto() {
  const [productos, setProductos] = useState([]);
  const [productoSelected, setProductoSelected] = useState();
  const [materialSelectedData, setMaterialSelectedData] = useState();
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
    MaterialService.getMaterialesByIdProducto(id).then((res) => {
      setMaterialSelectedData(res.data);
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

  const formListMateriales = () => {
    if (materialSelectedData === undefined) return null;
    return materialSelectedData.map((material) => (
      <Card.Text>
        <strong> {material.nombre}: </strong>
        {material.cantidad}
      </Card.Text>
    ));
  };

  const form =
    productos.length === 0 ? (
      <p>Ha ocurrido un error al cargar los productos</p>
    ) : (
      <div className="container-flex">
        <div
          className={`container-flex ${productoSelectedData ? 'w-75' : ''}`}
          id="form-venta-producto"
        >
          <div>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Producto</Form.Label>
              <Select
                classNamePrefix="select "
                isSearchable
                name="producto"
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
                name="cantidad"
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                value={moment().format('YYYY-MM-DD')}
                disabled
                name="fecha"
              />
            </Form.Group>
          </div>

          {productoSelectedData && (
            <div>
              <Card>
                <Card.Header>Detalles Producto</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Venta: </strong>
                    {productoSelectedData.precioVenta}
                  </Card.Text>
                  <Card.Text>
                    <strong>Mano Obra: </strong>
                    {productoSelectedData.manoObra}
                  </Card.Text>
                  <Card.Text>
                    <strong>Costo Materiales: </strong>
                    {productoSelectedData.costoMateriales}
                  </Card.Text>
                  <Card.Text>
                    <strong>Gasto Indefinido: </strong>
                    {productoSelectedData.costoIndefinido}
                  </Card.Text>
                  <Card.Text>
                    <strong>Ganancia Bruta: </strong>
                    {productoSelectedData.gananciaBruta}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
          {materialSelectedData && (
            <div>
              <Card>
                <Card.Header>Detalles Materiales</Card.Header>
                <Card.Body>{formListMateriales()}</Card.Body>
              </Card>
            </div>
          )}
        </div>
        {productoSelectedData && (
          <Image
            src={productoSelectedData.imagen.src}
            alt="Imagen Producto"
            style={{ width: '20%' }}
          />
        )}
      </div>
    );

  const submitHandler = (event) => {
    event.preventDefault();
    const producto = {
      id: event.target.producto.value,
      cantidad: event.target.cantidad.value
    };
    ProductService.saleProduct(producto);
  };

  return (
    <Form onSubmit={(e) => submitHandler(e)}>
      <section className="o-section--medium o-section--no-padding-top  o-section--no-padding-bottom section--background">
        <div className="container-flex" style={{ marginBottom: '2rem' }}>
          <h1 className="titulo-seccion__title">Venta de Producto</h1>
          <button type="submit" className="btn btn-svg btn-form ms-2">
            Vender
          </button>
        </div>
      </section>
      <section className="o-section--large form-datos">
        <div className="container">{form}</div>
      </section>
    </Form>
  );
}

export default VentaProducto;
