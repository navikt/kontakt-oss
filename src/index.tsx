import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { unregister } from './utils/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

unregister();
