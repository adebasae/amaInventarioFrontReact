import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import MaterialesService from '../../services/MaterialesService';

function ProductStafModal({ material, accion, saveFunction }) {
  const [materialSelected, setMaterialSelected] = useState();
  const [cantidad, setCantidad] = useState();
  const [allMateriales, setAllMateriales] = useState([]);

  useEffect(() => {
    if (material !== null) {
      setMaterialSelected({ value: material.nombre, label: material.nombre });
      setCantidad(material.cantidad);
    }
  }, [material]);

  useEffect(() => {
    MaterialesService.getAllMateriales().then((res) => {
      setAllMateriales(res.data);
    });
  }, []);

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
            options={allMateriales}
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
