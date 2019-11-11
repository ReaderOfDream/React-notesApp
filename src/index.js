import React from 'react';
import { render } from 'react-dom';
import './index.css';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import rootSaga from './sagas';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './store/store';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const store = createStore(history, sagaMiddleware);

sagaMiddleware.run(rootSaga);

render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root'),
);

registerServiceWorker();
