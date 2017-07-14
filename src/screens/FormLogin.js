import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export default class LoginGoogle extends Component {
	static navigationOptions = {
    	title: 'Login'
  	}

	constructor(props) {
		super(props);

		this.state = {
			email: 'malvre@gmail.com',
			password: '123456'
		}
	}

	doLogin() {
		const auth = firebase.auth();
		auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
			
			firebase.database().ref(`usuarios/${user.uid}`).once("value").then(snapshot => {
				AsyncStorage.setItem("username", snapshot.val().name);
				//this.props.navigation.navigate('TodoList');

				const resetAction = NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'TodoList' })
					]
				});
				this.props.navigation.dispatch(resetAction);

			}).catch(error => alert(error));

		}).catch(error => {
			alert(error);
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					value={this.state.email}
					keyboardType="email-address"
					autoCapitalize="none"
					onChangeText={text => this.setState({ email: text })}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					value={this.state.password}
					secureTextEntry
					onChangeText={text => this.setState({password: text })}
				/>
				<Button title="Login" onPress={() => this.doLogin() } />
				<Button title="Create an account" onPress={() => this.props.navigation.navigate('FormSignup') } />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16
	},
	input: {
		height: 40,
		borderColor: '#A0A0A0',
		borderWidth: 0.5,
		borderRadius: 6,
		margin: 5,
		padding: 5
	}
});