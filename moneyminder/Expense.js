import React, { useState, useEffect } from 'react';
import { Animated, FlatList, Text, View, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import E_popup from './E_popup'; // E_popup.js 파일을 import
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios'; // axios import

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'GT',
    color: '#333',
  },
  container: {
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    alignContent: 'center',
    verticalAlign: 'middle',
    shadowRadius: 4,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  emptyContainer: {
    height: 250,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop:20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    alignContent: 'space-around',
    verticalAlign: 'middle',
    shadowRadius: 4,
    marginVertical: 4,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    shadowColor: 'rgba(0.3, 0.3, 0.3, 0.3)',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.8,
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 300,
    justifyContent: 'space-between', // 팝업 창 내의 요소를 위아래로 분배
  },
  closeButton: {
    marginTop: 10, // 닫기 버튼과 하단 여백 설정
  },
  
  secondContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
    marginLeft:15,
    marginRight: 15,
    marginBottom: 20,
  },
  quarterContainer: {
    width: '48%', // 2개의 컨테이너가 한 줄에 들어가도록 너비 조절
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quarterContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quartertext: {
    alignItems: 'center',
    fontFamily: 'GT',
    fontSize: 19,
    marginBottom: 5,
  }
});

const Chart = () => {
  const [scrollY] = useState(new Animated.Value(0));
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expensesByDayOfWeek, setExpensesByDayOfWeek] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExpensesByDayOfWeek = async () => {
      try {
        const response = await axios.get('http://172.20.10.2:8080/api/week/users/1/weekly-expenses');
        setExpensesByDayOfWeek(response.data);
      } catch (error) {
        console.error('Error fetching expenses by day of week:', error);
      }
    };

    fetchExpensesByDayOfWeek();
  }, []);

  const data = {
    labels: Object.keys(expensesByDayOfWeek),
    datasets: [
      {
        data: Object.values(expensesByDayOfWeek),
      },
    ],
  };

  const handleBarPress = (bar) => {
    if (bar && bar.index !== undefined) {
      setSelectedBarIndex(bar.index);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <FlatList
      data={[data]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style = {styles.firstContainer}>
          <View style={styles.emptyContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
              <Text style={{ fontFamily: 'GT', fontSize: 19, color: '#333' }}>당신의 이번 달 소비가 가장 큰 품목은?</Text>
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <ImageBackground
                source={require('./assets/images/money.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.quarterContainer}>
              <View style={styles.quarterContent}>
                <View style={styles.quarterContent}>
                  <Text style = {styles.quartertext}>
                    소비메모
                  </Text>
                  <TouchableOpacity  onPress={()=> navigation.navigate('R_memo') }>
                    <ImageBackground
                      source={require('./assets/images/memo.png')}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.quarterContainer}>
              <View style={styles.quarterContent}>
                <View style={styles.quarterContent}>
                  <Text style = {styles.quartertext}>
                    금융 인사이트
                  </Text>
                  <TouchableOpacity onPress={()=> navigation.navigate('R_insight') }>
                    <ImageBackground
                      source={require('./assets/images/advice.png')}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.modalContent}>
                {/* E_popup 컴포넌트를 렌더링 */}
                <E_popup />
                <Button title="close" onPress={toggleModal} style={styles.closeButton} color='dimgrey' />
              </View>
            </View>
          </Modal>
        </View>
      )}
      horizontal={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    />
  );
};

export default Chart;
