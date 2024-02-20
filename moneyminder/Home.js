import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Expense from './Expense';
import MyCalendar from './Calendar';
import Chatting from './Chatting';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return <Text>Home</Text>;
}

function SearchScreen() {
  return <Expense />;
}

function CalendarScreen() {
  return <MyCalendar />;
}

function MessageScreen() {
  return <Chatting/>;
}

function BottomTabNavigationApp() {
  return (
    <Tab.Navigator initialRouteName="Home"
    tabBarOptions = {{
      activeTintColor: 'hotpink',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Expense"
        component={SearchScreen}
        options={{
          title: '지출',
          tabBarIcon: ({ color, size }) => (
            <Icon name="payment" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyCalendar"
        component={CalendarScreen}
        options={{
          title: '달력',
          tabBarIcon: ({ color, size }) => (
            <Icons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={MessageScreen}
        options={{
          title: '채팅',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigationApp;
