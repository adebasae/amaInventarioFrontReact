import React, { useState, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductStafModal from '../pages/Producto/ProductStafModal';
import Modal from './UI/Modal/Modal';
import MaterialesService from '../services/MaterialesService';

function ListaMateriales({ materiales, cargar }) {
  const [perPage, setPerPage] = useState(30);
  const [show, setShow] = useState(false);
  const [actionModal, setActionModal] = useState(1);
  const [productModal, setProductoModal] = useState(null);

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };

  const showModal = useCallback(
    (showProduct, action) => {
      setShow(!show);
      setProductoModal(showProduct);
      setActionModal(action);
    },
    [show]
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

  const saveFunction = (itemToSave) => {
    MaterialesService.saveMaterial(itemToSave).then(() => {
      showModal(null, 1);
      cargar();
    });
  };

  const form = (
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

  return { form };
}

export default ListaMateriales;
