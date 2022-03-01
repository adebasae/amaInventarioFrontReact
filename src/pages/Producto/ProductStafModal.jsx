import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import MaterialesService from '../../services/MaterialesService';

function ProductStafModal({ material, cant }) {
  const [materialSelected, setMaterialSelected] = useState(material);
  const [cantidad, setCantidad] = useState(cant);

  const [allMateriales, setAllMateriales] = useState([]);
  useEffect(() => {
    MaterialesService.getAllMateriales().then((res) => {
      setAllMateriales(res.data);
    });
  }, []);

  console.log(setCantidad);

  return (
    <div className=" container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Materiales</Form.Label>
          <Select
            classNamePrefix="select"
            className="form-control-block"
            isSearchable
            name="color"
            options={allMateriales}
            defaultValue={materialSelected}
            onChange={setMaterialSelected}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Cantidad"
            defaultValue={cantidad}
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
