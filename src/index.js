import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { initialAppState } from './redux/initialState';
import { headerReducer, tokenSenderReducer } from './redux/reducers';

import App from './containers/App';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';

const reducers = combineReducers({
	headerState: headerReducer,
	tokenSenderState: tokenSenderReducer
});

const store = createStore(reducers, initialAppState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

