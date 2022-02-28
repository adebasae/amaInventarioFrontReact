import React, { useState, useEffect, useCallback } from 'react';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import Modal from '../../components/UI/Modal/Modal';
import ProductStafModal from './ProductStafModal';

function NuevoProducto() {
  const [materiales, setMateriales] = useState([]);
  const [actionModal, setActionModal] = useState(1);
  const [productModal, setProductoModal] = useState(null);
  const [show, setShow] = useState(false);

  const [perPage, setPerPage] = useState(30);

  // primera carga
  useEffect(() => {
    setMateriales([{ nombre: 'adrian', cantidad: 3 }]);
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
    () => (
      <button
        type="button"
        classN="btn btn-secundary "
        clicked={() => showModal(null, 1)}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
        <span
          className="u-text-transform-uppercase"
          style={{ marginLeft: 10, position: 'relative' }}
        >
          Añadir Material al Producto
        </span>
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
            classN="btn btn-svg btn-form"
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

  const addProduct = async () => {
    // await addPersonService(worker)
    //   .then((res) => {
    //     if (res.data.hasError) {
    //       const { descriptionError } = res.data;
    //       addError(t(descriptionError), 'KO');
    //       setPersonModal(worker);
    //       return;
    //     }
    //     setPersons(res.data.pojo.listRespuestaPersona);
    //     showModal(null, 1);
    //     getAllPicker();
    //   })
    //   .catch((e) => {
    //     addError(t('nlr-vaya-algo-no-ha-ido-bien'), 'KO');
    //     setPersonModal(worker);
    //     console.log('error', e);
    //   });
    // setLoading(false);
  };

  const updateProduct = async () => {
    // setLoading(true);
    // await updatePersonService(worker)
    //   .then((res) => {
    //     if (res.data.hasError) {
    //       const { descriptionError } = res.data;
    //       addError(t(descriptionError), 'KO');
    //       setPersonModal(worker);
    //       return;
    //     }
    //     setPersons(res.data.pojo.listRespuestaPersona);
    //     getAllPicker();
    //     showModal(null, 2);
    //   })
    //   .catch((e) => {
    //     addError(t('nlr-vaya-algo-no-ha-ido-bien'), 'KO');
    //     setPersonModal(worker);
    //     console.log('error', e);
    //   });
    // setLoading(false);
  };

  const crud = (
    <>
      <DataTable
        className=""
        pagination
        paginationTotalRows={materiales.length}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationPerPage={perPage}
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
          productData={productModal}
          materiales={materiales}
          showModal={showModal}
          addProduct={addProduct}
          updateProduct={updateProduct}
          action={actionModal}
        />
      </Modal>
    </>
  );

  return (
    <>
      <section className="o-section--medium o-section--no-padding-top  o-section--no-padding-bottom section--background">
        <div className="container">
          <h1 className="titulo-seccion__title">Nuevo Producto</h1>
        </div>
      </section>
      <section className="o-section--large form-datos">
        <div className="container">{crud}</div>
      </section>
    </>
  );
}

export default NuevoProducto;
