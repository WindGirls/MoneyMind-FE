import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Expense from './Expense';
import Home from './Home';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'GT': require('./assets/fonts/GT.ttf'),
  });
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        setFontLoaded(true);
      } catch (error) {
        console.error("Font loading error:", error);
        // 필요한 에러 처리를 수행할 수 있습니다.
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
        <Stack.Screen name="Expense" component={Expense} />
        {/* 추가 스크린은 여기에 계속해서 등록하면 됩니다. */}
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
    backgroundColor: "#F0F5E0",
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: 300,
    height: 300,
  },
});
