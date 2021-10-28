import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, Store, createStore } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer, { TState } from '@store/reducer';

import App from './App';

import './index.styl';

const store: Store<TState> = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
);
