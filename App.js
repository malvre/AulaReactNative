import React from 'react';
import firebase from 'firebase';

import Main from './src/Main';

export default class App extends React.Component {
	componentWillMount() {
		let config = {
			apiKey: "AIzaSyBUv478BpBa2eBVF3bOYyZCQbG94JZYT0U",
			authDomain: "todoapp-45331.firebaseapp.com",
			databaseURL: "https://todoapp-45331.firebaseio.com",
			projectId: "todoapp-45331",
			storageBucket: "todoapp-45331.appspot.com",
			messagingSenderId: "926688080317",
			persistence: true
  		};
  		firebase.initializeApp(config);
	}

	render() {
		return (
			<Main />
		);
	}
}