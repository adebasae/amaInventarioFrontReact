import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import loadingGif from '../loader.gif';

function Loading() {
  const { promiseInProgress } = usePromiseTracker();
  const loading = () =>
    promiseInProgress && (
      <div id="overlay">
        <img src={loadingGif} alt="loading" />
      </div>
    );

  return <>{loading()}</>;
}
export default Loading;
