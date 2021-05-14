import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { customMiddleWare, reducer } from './reducer';

let middlewareEnhancer;

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default;
  middlewareEnhancer = composeWithDevTools(
    applyMiddleware(logger, customMiddleWare, thunk)
  );
} else {
  middlewareEnhancer = composeWithDevTools(
    applyMiddleware(customMiddleWare, thunk)
  );
}

let store = createStore(reducer, middlewareEnhancer);

export { store };
