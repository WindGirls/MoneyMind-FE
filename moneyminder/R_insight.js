import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { loadFonts } from './FontLoader'; // FontLoader 파일의 경로에 따라 수정하세요.

// 배경 이미지 파일의 로컬 경로
const backgroundImageUri = require('./assets/images/iconmoney.png');

function R_insight({ navigation }) {
  const fontsLoaded = loadFonts();

  const[termData,setTermData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomIdResponse = await fetch(`http://172.20.10.2:8080/api/terms/random`);
        const randomIdData = await randomIdResponse.json();
        const randomId = randomIdData; // 이 부분에 받은 랜덤 ID를 사용하도록 수정해야 함

         // 랜덤한 ID를 사용하여 데이터 요청
        const response = await fetch(`http://172.20.10.2:8080/api/terms/${randomId}`);
        const data = await response.json();

        setTermData(data);
      }
      catch(error){
        console.error('데이터를 불러오는 중 에러 발생:', error);
      }
    };
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 아무것도 표시하지 않음
  }

  return (
    <ImageBackground source={backgroundImageUri} style={styles.container} resizeMode="contain">
      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: 'GT' }]}>{termData ? termData.term: ''}</Text>
        <Text style={[styles.lesson, { fontFamily: 'GT' }]}>{termData ? termData.definition: ''}</Text>
       
      </View>
      <View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={[styles.buttonText]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'ffffff',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lesson: {
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'song,ttf',
  },
  button: {
    backgroundColor: 'hotpink',
    marginTop:10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default R_insight;
