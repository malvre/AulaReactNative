import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	AsyncStorage,
	FlatList,
	TouchableHighlight,
	TouchableOpacity,
	Image
} from 'react-native';
import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import LogoutButton from '../components/LogoutButton'
import RowItem from '../components/RowItem';

export default class TodoList extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Todo App',
		headerLeft: <LogoutButton navigation={navigation} />,
		headerRight: <TouchableOpacity onPress={() => navigation.navigate("NewItem")}>
						<Image source={require('../img/add.png')}  style={styles.navButton}/>
					</TouchableOpacity>
  	});

	constructor(props) {
		super(props);

		this.state = {
			username: null,
			data: []
		}
	}
	
	componentWillMount() {
		const user = firebase.auth().currentUser;
		if (!user) {

			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: 'FormLogin' })
				]
			});
			this.props.navigation.dispatch(resetAction);
		} else {
			AsyncStorage.getItem('username').then((value) => this.setState({ 'username': value }));
		}
	}

	componentDidMount() {
		this.fetchItems();
	}

	render() {
		return (
			<FlatList
				data={this.state.data}
				renderItem={({item}) => (<RowItem item={item} />)}
				keyExtractor={item => item._key}
				ItemSeparatorComponent={this.renderSeparator}
			/>
		);
	}

	renderSeparator = () => {
		return (
			<View style={{ height: 1, width: "100%", backgroundColor: "#DDDDDD" }} />
		);
	};

	fetchItems() {
		const user = firebase.auth().currentUser;

		if (!user) {
			return;
		}

		let itens = [];

		firebase.database().ref(`usuarios/${user.uid}/itens`).on('value', snapshot => {
			snapshot.forEach((child) => {
				itens.push({
					item: child.val().item,
					done: child.val().done,
					_key: child.key
				});
			});
			this.setState({ data: itens });
		})
	}

}


const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		padding: 10
	},
	item: {
		fontSize: 16
	},
	navButton: {
		width: 24,
		height: 24,
		margin: 8
	}
});