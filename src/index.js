import React from 'react';
import {render} from 'react-snapshot'
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

serviceWorker.register();
