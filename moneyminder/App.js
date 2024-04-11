import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Expense from './Expense';
import Home from './Home';

import R_emotions from './R_emotions';
import Chatting from './Chatting';
import ChatBot from './ChatBot';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import R_memo from './R_memo';
import R_bloom from './R_bloom';
import R_insight from './R_insight';
import Login from './Login';



const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'GT': require('./assets/fonts/GT.ttf'),
  });
};


export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!Constants) {
  //         console.error('Constants is null or undefined');
  //         return;
  //       }
  //       const { manifest } = Constants;
  //       console.log(manifest);
  //       if (!manifest) {
  //         console.error('Manifest is null or undefined');
  //         return;
  //       }

  //       const baseURL = `http://${manifest.debuggerHost.split(':').shift()}:8080/api/account/test`;
  //       const response = await axios.get(baseURL);
  //       setData(response.data);
  //       console.log('Response:', response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        setFontLoaded(true);
      } catch (error) {
        console.error("Font loading error:", error);
        
      } finally {
        setLoading(false);
      }
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;

  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Expense" component={Expense} />
        <Stack.Screen name = "R_emotions" component={R_emotions}/>
        <Stack.Screen name = "R_memo" component={R_memo}/>
        <Stack.Screen name = "R_bloom" component={R_bloom}/>
        <Stack.Screen name = "R_insight" component={R_insight}/>
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="ChatBot" component={ChatBot} />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const LoadingScreen = () => (
  <SafeAreaView style={styles.container}>
    <Image source={require('./assets/spinner.gif')} style={styles.gif} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 300,
    height: 300,
  },
});
