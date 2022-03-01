import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

function ProductStafModal({ materiales, cant }) {
  const [materialSelected, setMaterialSelected] = useState();
  const [cantidad, setCantidad] = useState();
  console.log(cant);

  useEffect(() => {
    setMaterialSelected([]);
    setCantidad(0);
  }, [materiales]);

  return (
    <div className=" container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control type="text" placeholder="Cantidad">
            {cantidad}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Materiales</Form.Label>
          <Select
            classNamePrefix="select"
            className="form-control-block"
            isSearchable
            name="color"
            options={materiales}
            onChange={(event) => {
              console.log(event);
              // inputChangedHandler(event, ControlesEnum.TIPOPERFIL);
            }}
            value={materialSelected}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProductStafModal;
