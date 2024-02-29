import React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Expense from './Expense';
import MyCalendar from './Calendar';
import Chatting from './Chatting';
import ChatBot from './ChatBot';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import chatimage from './assets/images/chatbot.png';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: "900" }}>메인</Text>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>메인</Text>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>메인</Text>
      </View>
      <View style={{ flex: 1, width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: 20, paddingRight: 20 }}>
        <TouchableOpacity
          style={{ height: 60, width: 60, borderRadius: 70, backgroundColor: '#4169e1', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('ChatBot')}
        >
         
          <Image source={chatimage} style={{ width: 60, borderRadius: 70,height: 60 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}



function SearchScreen() {
  return <Expense />;
}

function CalendarScreen() {
  return <MyCalendar />;
}

function MessageScreen() {
  return <Chatting />;
}



function BottomTabNavigationApp() {
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
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
        component={Chatting}
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




const styles = StyleSheet.create({

})