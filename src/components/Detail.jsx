import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Detail(props) {
  const {
    descripcion,
    modelo,
    precio,
    cpu,
    ram,
    resolucion,
    bateria,
    camara,
    peso,
    dimensiones,
    sistema,
    marca
  } = props;

  // Para cambio de idioma la internacionalización se hace a estas variables

  const MODELO = 'Modelo';
  const PRECIO = 'Precio';
  const CPU = 'CPU';
  const RAM = 'RAM';
  const RESOLUCION = 'Resolución de Pantalla';
  const BATERIA = 'Batería';
  const CAMARA = 'Camara';
  const PESO = 'Peso';
  const DIMENSIONES = 'Dimensiones';
  const MARCA = 'Marca';
  const SISTEMA = 'Sistema Operativo';

  return (
    <div>
      <input type="checkbox" className="read-more-state" id="post-detail" />

      <div>
        <input type="checkbox" className="read-more-state" id="post-2" />

        <div className="read-more-wrap">
          <Card className=" read-more-wrap h-auto">
            <Card.Body>
              <Card.Title>{descripcion}</Card.Title>

              <Card.Text className=" px-2">
                <span>{`${MODELO}:`}</span>
                {` ${modelo}`}
              </Card.Text>
              <Card.Text className=" px-2">
                <span>{`${PRECIO}:`}</span>
                {` ${precio}`}
              </Card.Text>
              <Card.Text className=" px-2">
                <span>{`${CPU}:`}</span>
                {` ${cpu}`}
              </Card.Text>
              <Card.Text className=" px-2">
                <span>{`${RAM}:`}</span>
                {` ${ram}`}
              </Card.Text>

              <Card.Text className=" px-2 read-more-target">
                <span>{`${RESOLUCION}:`}</span>
                {` ${resolucion}`}
              </Card.Text>
              <Card.Text className=" px-2 read-more-target">
                <span>{`${BATERIA}:`}</span>
                {` ${bateria}`}
              </Card.Text>
              <Card.Text className=" px-2 read-more-target">
                <span>{`${CAMARA}:`}</span>
                {` ${camara}`}
              </Card.Text>
              <Card.Text className=" px-2 read-more-target">
                <span>{`${PESO}:`}</span>
                {` ${peso}`}
              </Card.Text>
              <Card.Text className=" px-2 read-more-target">
                <span>{`${DIMENSIONES}:`}</span>
                {` ${dimensiones}`}
              </Card.Text>
              <Card.Text className=" px-2 read-more-target">
                <span>{`${SISTEMA}:`}</span>
                {` ${sistema}`}
              </Card.Text>
              <Card.Text className=" px-2 read-more-target">
                <span>{`${MARCA}:`}</span>
                {` ${marca}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <label htmlFor="post-2" className="read-more-trigger" />
      </div>
    </div>
  );
}

Detail.propTypes = {
  descripcion: PropTypes.string.isRequired,
  modelo: PropTypes.string.isRequired,
  precio: PropTypes.string.isRequired,
  cpu: PropTypes.string.isRequired,
  ram: PropTypes.string.isRequired,
  resolucion: PropTypes.string.isRequired,
  bateria: PropTypes.string.isRequired,
  camara: PropTypes.string.isRequired,
  peso: PropTypes.string.isRequired,
  dimensiones: PropTypes.string.isRequired,
  sistema: PropTypes.string.isRequired,
  marca: PropTypes.string.isRequired
};

export default Detail;
