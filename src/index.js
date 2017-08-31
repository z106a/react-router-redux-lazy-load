import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import App from './components/App/index.jsx';
import createReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';


const middlewares = [
    // sagaMiddleWare
    // thunkMiddleWare
];

const enhancer = [
    applyMiddleware(...middlewares),
];

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(createReducer(), {}, composeEnhancers(...enhancer));


store.asyncReducers = {};


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
