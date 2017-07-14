import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

export default class LogoutButton extends Component {
	render() {
		return(
			<TouchableOpacity onPress={() => this.logout()}>
				<Image source={require('../img/exit.png')}  style={styles.navButton}/>
			</TouchableOpacity>
		);
	}

	logout() {
		firebase.auth().signOut();
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'FormLogin' })
			]
		});
		this.props.navigation.dispatch(resetAction);
	}
}

const styles = StyleSheet.create({
	navButton: {
		width: 24,
		height: 24,
		margin: 8
	}
});