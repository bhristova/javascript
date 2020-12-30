import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import MainPage from './containers/MainPage';

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <MainPage/>
        </Layout>
      </div>
    );
  }
}

export default App;
