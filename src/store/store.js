import { createStore as createStoreInternal, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createReducer from '../reducers/rootReducer';

export function createStore(history, sagaMiddleware) {
  const storeEnhancers = applyMiddleware(routerMiddleware(history), sagaMiddleware);
  let enhancers;
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancers = composeEnhancers(storeEnhancers);
  } else {
    enhancers = storeEnhancers;
  }

  const reducer = createReducer(history);

  return createStoreInternal(
    connectRouter(history)(reducer),
    enhancers,
  );
}
