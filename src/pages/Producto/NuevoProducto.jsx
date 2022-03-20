import React, { useState, useEffect, useCallback } from 'react';
import { Form, Image } from 'react-bootstrap';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import Modal from '../../components/UI/Modal/Modal';
import ProductStafModal from './ProductStafModal';
import MaterialesService from '../../services/MaterialesService';
import ProductService from '../../services/ProductService';

function NuevoProducto(props) {
  const { match } = props;

  const [materiales, setMateriales] = useState([]);
  const [actionModal, setActionModal] = useState(1);
  const [productModal, setProductoModal] = useState(null);
  const [show, setShow] = useState(false);
  const [perPage, setPerPage] = useState(30);
  const [producto, setProducto] = useState(null);

  const cargar = () => {
    ProductService.getProductById(match.params.id).then((res) => {
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

  const showModal = useCallback(
    (showProduct, action) => {
      setShow(!show);
      setProductoModal(showProduct);
      setActionModal(action);
    },
    [show]
  );

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };

  const actionsMemo = React.useMemo(
    () =>
      materiales.length === 0 ? null : (
        <button
          type="button"
          className="btn btn-outline-primary "
          onClick={() => showModal(null, 1)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="u-text-transform-uppercase" />
        </button>
      ),
    [showModal]
  );

  const paginationOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  };

  const columns = [
    {
      name: 'Nombre',
      sortable: true,
      selector: 'nombre'
    },
    {
      name: 'Cantidad',
      sortable: true,
      selector: 'cantidad'
    },

    {
      name: 'Acciones',
      button: true,
      cell: useCallback((row) => (
        <div>
          <button
            type="button"
            className="btn btn-svg btn-form"
            onClick={() => showModal(row, 2)}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        </div>
      ))
    }
  ];

  const customStyles = {
    header: {
      style: {
        textTransform: 'capitalize'
      }
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#e2e2e2',
        background: 'transparent',
        pointerEvents: 'auto',
        textTransform: 'capitalize'
      }
    },
    headCells: {
      style: {
        // '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#e2e2e2',
        background: '#ededed',
        fontWeight: 800,
        fontSize: '16px'
        // },
      }
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: '#e2e2e2',
          background: 'transparent'
        }
      }
    },
    rows: {
      style: {
        minHeight: '25px !important'
      }
    }
  };

  const saveFunction = (itemToSave) => {
    MaterialesService.saveMaterial(itemToSave).then(() => {
      showModal(null, 1);
      cargar();
    });
  };

  const listaMateriales = (
    <>
      <div className="linea" />
      <h4 style={{ marginTop: '2rem' }}>Lista de Materiales</h4>

      <DataTable
        className=""
        pagination
        paginationTotalRows={materiales.length}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationPerPage={perPage}
        actionsMemo
        columns={columns}
        data={materiales}
        noDataComponent="Sin datos"
        paginationComponentOptions={paginationOptions}
        responsive
        customStyles={customStyles}
        striped
        actions={actionsMemo}
      />

      <Modal show={show} classN="" modalClosed={() => showModal(null, 1)}>
        <ProductStafModal
          material={productModal}
          saveFunction={saveFunction}
          accion={actionModal}
          showModal={showModal}
        />
      </Modal>
    </>
  );

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

  return (
    <>
      <section className="o-section--medium o-section--no-padding-top  o-section--no-padding-bottom section--background">
        <div className="container">
          <h1 className="titulo-seccion__title">Nuevo Producto</h1>
        </div>
      </section>
      <section className="o-section--large form-datos">
        <div className="container">{form}</div>
        <div className="container">{listaMateriales}</div>
      </section>
    </>
  );
}

export default NuevoProducto;
