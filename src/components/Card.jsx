import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Card(props) {
  const { imagen, description, marca, modelo, precio, id } = props;
  const history = useHistory();

  const comprar = () => {
    const path = `/detalles/${id}`;
    history.push(path);
  };

  return (
    <div className="card p-2">
      <div className="p-info px-3 py-3">
        <div>
          <h5 className="mb-0">{modelo}</h5>
          <span>{marca}</span>
        </div>
        <div className="p-price d-flex flex-row">
          <span>$</span>
          <h1>{precio}</h1>
        </div>
        <div className="heart">
          <i className="bx bx-heart" />
        </div>
      </div>
      <div className="text-center p-image">
        <img alt={imagen.alt} src={imagen.src} />
      </div>
      <div className="p-about">
        <p>{description}</p>
      </div>
      <div className="buttons d-flex flex-row gap-3 px-3 w-75">
        <button
          type="button"
          onClick={() => comprar()}
          className="btn btn-outline-primary w-100"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  imagen: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string.isRequired,
  marca: PropTypes.string.isRequired,
  modelo: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired
};

// // Specifies the default values for props:
// Card.defaultProps = {
//   imagen: { alt: 'imgtest', src: 'https://i.imgur.com/hpftqCo.png' },
//   description:
//     'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final',
//   modelo: 'Professional Headphones',
//   marca: 'Beats By Dre',
//   precio: 299
// };

export default Card;
