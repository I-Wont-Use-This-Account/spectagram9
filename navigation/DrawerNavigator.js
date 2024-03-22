import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import Profile from '../screens/Profile';
import Logout from '../screens/Logout';
import { onValue } from 'firebase/database';

import { getAuth } from 'firebase/auth';
import {ref, onValue } from 'firebase/database';
import db from '../config';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {

	componentDidMount() {
		let theme;
		const auth = getAuth();
		const userId = auth.currentUser.uid;

		onValue(ref(dh, '/users/'+ userId), (snapshot) => {
			this.setState({
				light_theme: theme === 'light' ? true : false
			})
		})
	}

	render() {
		let props = this.props;
		return (
			<Drawer.Navigator drawerContent={(props) => <CustomSidebarMenu {...props} />}screenOptions={{ headerShown: false, drawerActiveTintColor: '#e91e63', drawerInactiveTintColor: 'grey', itemStyle: { marginVertical: 5 }, }}>
				<Drawer.Screen
					name='Home'
					component={StackNavigator}
					options={{ unmountOnBlur: true }}
				/>
				<Drawer.Screen
					name='Profile'
					component={Profile}
					options={{ unmountOnBlur: true }}
				/>
				<Drawer.Screen
					name='Logout'
					component={Logout}
					options={{ unmountOnBlur: true }}
				/>
			</Drawer.Navigator>
		);
	}
};

export default class DrawerNavigator extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			light_theme: true
		}
	}
}
