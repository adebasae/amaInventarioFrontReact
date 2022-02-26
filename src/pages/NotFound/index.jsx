import React from 'react';
import Layout from '../../components/Layout';

function NotFound() {
  const redirect = () => {
    document.location.href = '/';
  };
  return (
    <Layout>
      <section className="o-section--medium">
        <div className="container-inner u-margin-top-hero">
          <div className="u-text-center">
            <h1 className="titulo-pagina u-margin-bottom-medium">
              Algo va mal por aquí
            </h1>
            <p className="u-margin-bottom-large">
              No hemos podido encontrar la página que buscas, puedes volver a la
              home.
            </p>

            <div className="botonera u-margin-bottom-extrahuge">
              <button
                className="btn btn-default"
                type="button"
                onClick={redirect}
              >
                Ir a la home
              </button>
            </div>

            <div className="img u-margin-bottom-extrahuge">
              <img
                src="/assets/images/carro-error.png"
                alt="Imagen de un carro de supermercado"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default NotFound;
