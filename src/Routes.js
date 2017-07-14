import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import TodoList from './screens/TodoList';
import FormLogin from './screens/FormLogin';
import FormSignup from './screens/FormSignup';
import NewItem from './screens/NewItem.js';

export const Nav = StackNavigator(
	{
		TodoList: { screen: TodoList },
		FormLogin: { screen: FormLogin },
		FormSignup: { screen: FormSignup },
		NewItem: { screen: NewItem }
	},
	{
  		navigationOptions: {
			headerTintColor: '#000000',
			headerTitleStyle: {
				
			},
			headerStyle: {
				backgroundColor: '#CDDC39'
			}
		}
	}
);