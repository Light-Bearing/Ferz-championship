import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import onload from './onload';
import reportWebVitals from './reportWebVitals';
import Crash from './app/components/crash';
import 'bootstrap/dist/css/bootstrap.min.css';

// import * as serviceWorker from './serviceWorker';

onload(async () => {
    try {
        let response = await fetch('config.json');
        if (response.status != 200)
            throw new Error('Невозможно загрузить настройки из config_frontend.json');
        let config = await response.json();
        ReactDOM.render(<App config={config} />, document.getElementById('root'));
    } catch (error) {
        ReactDOM.render(<Crash error={error} />, document.getElementById('root'));
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// serviceWorker.unregister();