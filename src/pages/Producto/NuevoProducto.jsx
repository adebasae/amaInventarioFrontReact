import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Detail from '../../components/Detail';
import ProductService from '../../services/ProductService';
import useAppContext from '../../hooks/useAppContext';
import variables from '../../assets/scss/01_settings/_settings.variables.scss';

const coloresBD = [
  { label: 'Azul', value: '1' },
  { label: 'Amarrillo', value: '2' },
  { label: 'Rojo', value: '3' },
  { label: 'Verde', value: '4' }
];

const storeBD = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' }
];

function NuevoProducto(props) {
  const { match } = props;
  const [detail, setDetail] = useState();
  const { setCarCount } = useAppContext();

  const CSS = {
    backgroundColor: variables.colorPrincipal
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      const { backgroundColor } = CSS;

      return {
        ...styles,

        backgroundColor: isSelected
          ? `${backgroundColor}`
          : styles.backgroundColor,
        color: 'black'
      };
    }
  };

  // Para cambio de idioma la internacionalización se hace a estas variables

  const NO_DETAILS = 'No hay detalles';
  const ADD = 'Añadir';
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);

  useEffect(() => {
    ProductService.getProductById(match.params.id).then((res) => {
      setDetail(res.data);
    });
  }, [match]);

  if (detail === undefined) return NO_DETAILS;

  const comprar = (color, store, id) => {
    ProductService.addCar(parseInt(color, 10), parseInt(store, 10), id).then(
      (res) => {
        if (res === undefined) return;

        setCarCount(res.data.count);
      }
    );
  };

  return (
    <div
      id="productDetails"
      className="container flex-wrap justify-content-between card-container d-flex  flex-row"
    >
      <div className="w-100 d-flex flex-row py-3 ">
        <h2>Detalles</h2>
      </div>
      <div className="sticky">
        <div className="wh">
          <img
            className="img-fluid"
            alt={detail.imagen.alt}
            src={detail.imagen.src}
          />
        </div>
      </div>
      <Detail
        descripcion={detail.descripcion}
        modelo={detail.modelo}
        precio={detail.precio}
        cpu={detail.cpu}
        ram={detail.ram}
        resolucion={detail.resolucion}
        bateria={detail.bateria}
        camara={detail.camara}
        peso={detail.peso}
        dimensiones={detail.dimensiones}
        sistema={detail.sistema}
        marca={detail.marca}
      />
      <div className=" sticky" style={{ top: '2%', width: '274px' }}>
        <Select
          className="py-2"
          classNamePrefix="select "
          isSearchable
          name="color"
          menuPlacement="auto"
          menuPosition="fixed"
          options={coloresBD}
          onChange={(e) => {
            setSelectedColor(e);
          }}
          placeholder="Seleccione Color..."
          value={selectedColor}
          autosize={false}
        />

        <Select
          className="py-2"
          classNamePrefix="select "
          isSearchable
          menuPlacement="auto"
          menuPosition="fixed"
          autosize={false}
          name="color"
          options={storeBD}
          onChange={(e) => {
            setSelectedStore(e);
          }}
          placeholder="Seleccione Almacenamiento..."
          value={selectedStore}
          styles={colourStyles}
        />

        <button
          type="button"
          onClick={() =>
            comprar(selectedColor.value, selectedStore.value, match.params.id)
          }
          className="btn btn-outline-primary w-40 float-end"
          disabled={
            selectedColor.value === undefined ||
            selectedStore.value === undefined
          }
        >
          {ADD}
        </button>
      </div>
    </div>
  );
}

export default NuevoProducto;
