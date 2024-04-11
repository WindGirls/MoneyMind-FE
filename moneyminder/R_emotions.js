import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 20,
  },
  dateTimeText: {
    fontWeight: 'bold',
  },
  emotionContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap', // 넘치는 버튼을 다음 줄에 배치
    alignItems: 'center',
    marginBottom: 10,
  },
  emotionButton: {
    marginLeft:5,
    marginRight:5,
    marginBottom: 10, // 각각의 버튼 아래에 여백 추가
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  emotionButtonText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'hotpink',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  expenseText: {
    fontFamily: 'GT',
    fontSize:15,
    marginBottom:15,
  },
  expenseTextContainer : {
    marginBottom: 15,
    borderWidth:1,
    width: 300,
    height:200,
    borderRadius:5,
  }
});

function R_emotions({ navigation }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  const saveEmotion = () => {
    // 저장 로직 구현
    console.log('Emotion saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>소비티콘 기록하기</Text>
      <Text style={styles.dateTime}><Text style={styles.dateTimeText}>현재 시간:</Text> {currentDateTime}</Text>
    
        <Text style = {styles.expenseText}>소비 목록</Text>
       <View style = {styles.expenseTextContainer}></View>
    
      <View style={styles.emotionContainer}>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>🥰</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>😭</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>😠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>💊</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>🍽️</Text>
        </TouchableOpacity>

        {/* 추가 이모티콘 버튼들 */}
      </View>
      <View style={styles.emotionContainer}>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>✈️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>💗</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>📝</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>💄</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveEmotion} style={styles.emotionButton}>
          <Text style={styles.emotionButtonText}>🚴</Text>
        </TouchableOpacity>

        {/* 추가 이모티콘 버튼들 */}
      </View>
     
      <TouchableOpacity onPress={saveEmotion} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default R_emotions;
