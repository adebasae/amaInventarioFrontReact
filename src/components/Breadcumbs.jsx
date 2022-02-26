import React from 'react';
import { Route, Link } from 'react-router-dom';

function Breadcrumbs() {
  return (
    <Route
      path="*"
      render={(props) => (
        <Link to={props.location.pathname}>{props.location.pathname}</Link>
      )}
    />
  );
}

export default Breadcrumbs;
