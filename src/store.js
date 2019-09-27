import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import state from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  state,
  composeEnhancers(
    applyMiddleware(...[ reduxThunk ])
  )
);