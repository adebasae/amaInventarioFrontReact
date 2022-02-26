import React from 'react';

function Test(props) {
  const { match } = props;
  return (
    <div>
      <h2>{match.params.id}</h2>
    </div>
  );
}
export default Test;
