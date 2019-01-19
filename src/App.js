import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Main from './Components/MainComponent';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <Main></Main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
