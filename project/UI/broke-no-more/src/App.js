import React, { Component } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Layout from './containers/Layout/Layout';
import MainPage from './containers/MainPage';
import {BrowserRouter} from 'react-router-dom';

import './App.css';


class App extends Component {

  ErrorFallback = ({error, resetErrorBoundary}) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  render() {
    return (
      <ErrorBoundary FallbackComponent={this.ErrorFallback}>
        <BrowserRouter>
          <Layout/>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default App;
