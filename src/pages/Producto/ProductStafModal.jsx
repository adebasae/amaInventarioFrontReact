import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

function ProductStafModal({ materiales, material, accion, saveFunction }) {
  const [materialSelected, setMaterialSelected] = useState();
  const [cantidad, setCantidad] = useState();

  useEffect(() => {
    if (material !== null) {
      setMaterialSelected({ value: material.nombre, label: material.nombre });
      setCantidad(material.cantidad);
    } else {
      setMaterialSelected(null);
      setCantidad(0);
    }
  }, [material]);

  const submitHandler = () => {
    const toSubmit = { nombre: materialSelected.value, cantidad };
    saveFunction(toSubmit);
  };

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
            options={materiales}
            value={materialSelected}
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
        <button
          type="button"
          className="btn btn-svg btn-form"
          onClick={(e) => submitHandler(e)}
        >
          {accion === 1 ? 'Añadir' : 'Modificar'}
        </button>
      </Form>
    </div>
  );
}

export default ProductStafModal;
