import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import firebase from 'firebase';

export default class NewItem extends Component {
	static navigationOptions = {
    	title: 'New Item'
  	}

	constructor(props) {
		super(props);

		this.state = {
			newitem: ''
		}
	}

	saveItem() {
		const user = firebase.auth().currentUser;
		firebase.database().ref(`/usuarios/${user.uid}/itens`).push(
			{
				item: this.state.newitem,
				done: false
			}).then(() => {
				this.props.navigation.navigate('TodoList');
			}).catch(error => {
				alert(error);
			}
		);
	}
	
	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="New item"
					value={this.state.newitem}
					onChangeText={text => this.setState({ newitem: text })}
				/>
				<Button
					title="Save"
					onPress={ () => this.saveItem() }
				/>
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