import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { View, Text } from 'react-native'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import firebase from 'firebase'
import LoginForm from './components/LoginForm'
import Router from './Router'


class App extends Component{
	componentWillMount(){
		const config = {
    apiKey: 'AIzaSyBlSm2oK420xVJ7ZQEEiPJ_3RxdLJsiAz8',
    authDomain: 'manager-6ad33.firebaseapp.com',
    databaseURL: 'https://manager-6ad33.firebaseio.com',
    projectId: 'manager-6ad33',
    storageBucket: 'manager-6ad33.appspot.com',
    messagingSenderId: '451949545426'
  };
  firebase.initializeApp(config);
	}
	render(){
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
		return(
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}

export default App
