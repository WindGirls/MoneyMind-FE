import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App(){
  return(
    <View style = {StyleSheet.container}>
      <Text>Open up App.js to start working on your app! 메롱</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});