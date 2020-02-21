import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root')

if (rootEl.hasChildNodes()) {
    ReactDOM.hydrate(<App />, rootEl);
} else {
    ReactDOM.render(<App />, rootEl);
}

serviceWorker.register();
