import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default class FormSignup extends Component {
	static navigationOptions = {
    	title: 'Sign Up'
  	}

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}
	
	doCreateAccount() {
		const auth = firebase.auth();
		auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
			const db = firebase.database().ref("usuarios");
			db.child(user.uid).set({
				name: this.state.name
			});
			this.props.navigation.navigate('TodoList');

		}).catch(error => {
			alert(error);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Name"
					value={this.state.name}
					onChangeText={text => this.setState({ name: text })}
				/>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					keyboardType="email-address"
					autoCapitalize="none"
					value={this.state.email}
					onChangeText={text => this.setState({ email: text })}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={this.state.password}
					onChangeText={text => this.setState({password: text })}
				/>
				<Button title="Create account" onPress={() => this.doCreateAccount()} />
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