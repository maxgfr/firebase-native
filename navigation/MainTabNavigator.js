import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GoogleScreen from '../screens/GoogleScreen';
import FacebookScreen from '../screens/FacebookScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Normal',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-log-in`
          : 'md-log-in'
      }
    />
  ),
};

const GoogleStack = createStackNavigator({
  Links: GoogleScreen,
});

GoogleStack.navigationOptions = {
  tabBarLabel: 'Google',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='logo-google'
    />
  ),
};

const FacebookStack = createStackNavigator({
  Facebook: FacebookScreen,
});

FacebookStack.navigationOptions = {
  tabBarLabel: 'Facebook',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='logo-facebook'
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  GoogleStack,
  FacebookStack
});
