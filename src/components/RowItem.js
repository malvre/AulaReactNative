import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipeable';
import firebase from 'firebase';

export default class RowItem extends Component {
	swipeable = null;

	render() {
		const rightContent = <View style={styles.rightContent}><Text style={styles.rightContentText}>Remove</Text></View>;

		const leftButtons = [
			<TouchableOpacity style={{ flex: 1 }} onPress={() => this.done()}>
				<View style={styles.leftContent}>
					<Text style={styles.leftContentText}>Done</Text>
				</View>
			</TouchableOpacity>
		];

		return (
			<Swipeable
				leftButtons={leftButtons}
				rightContent={rightContent}
				onRightActionRelease={() => this.onDelete(this.props.item)}
				onRef={ref => this.swipeable = ref}
			>
				<View style={styles.itemContainer}>
					<Text style={styles.item}>{this.props.item.item}</Text>
				</View>
			</Swipeable>
		);
	}

	onDelete(item) {
		const user = firebase.auth().currentUser;
		firebase.database().ref(`usuarios/${user.uid}/itens/${item._key}`).remove();
	}

	done() {
		alert("Done");
		this.swipeable.recenter();
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
	rightContent: {
		backgroundColor: '#ef5350',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	rightContentText: {
		color: '#FFFFFF',
		justifyContent: 'flex-end',
		marginLeft: 10
	},
	leftContent: {
		backgroundColor: '#00C853',
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	leftContentText: {
		color: '#FFF',
		fontSize: 18,
		marginRight: 10
	}
});