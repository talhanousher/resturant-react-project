import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Store } from './Redux/store'

import Main from './Components/MainComponent';

class App extends Component {
  render() {
    const store = Store()
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='app'>
            <Main></Main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
