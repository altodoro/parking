import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { BrowserRouter } from 'react-router-dom'
import { App } from './App';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import './index.css';
// import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers';

const logger = createLogger();

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))