import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function R_memo({ navigation }) {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    console.log
    const fetchUserData = async () => {
      console.log("들아옴");
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log(userId);
        if (userId !== null) {
          setUserId(parseInt(userId));
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();

    
  }, []);

  const saveMemo = async () => {
    console.log(userId,"-----------------------------");
    try {
      console.log("http://172.20.10.2:8080/api/memos/save", { userId: userId, content: content });
     const response =  await axios.post(`http://172.20.10.2:8080/api/memos/save`, { userId: userId, content: content });
      console.log(userId);
      console.log('Memo saved:', response.data);
      await AsyncStorage.setItem('savedMemo', content);
      console.log('Memo saved to AsyncStorage:', content);
    } catch (error) {
      console.error('Failed to save memo:', error);
    }
  };

  const deleteMemo = async () => {
    try {
      if (!userId) {
        Alert.alert('User not logged in', 'Please log in before deleting a memo.');
        return;
      }
      
      await axios.delete(`http://172.20.10.2:8080/api/memos/users/${userId}/delete`);
      console.log('Memo deleted from database');
      await AsyncStorage.removeItem('savedMemo');
      console.log('Memo deleted from AsyncStorage');
      setContent('');
    } catch (error) {
      console.error('Failed to delete memo:', error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>소비 메모</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="소비를 위해 필요한 메모를 작성하세요..."
          value={content}
          onChangeText={text => setContent(text)}
        />
        <TouchableOpacity style={styles.button} onPress={saveMemo}>
          <Text style={styles.buttonText}>Save Memo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'GT',
  },
  input: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#fff',
  },
  button: {
    backgroundColor: 'hotpink',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
  },
});

export default R_memo;
