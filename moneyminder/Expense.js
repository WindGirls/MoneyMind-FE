import * as Font from "expo-font";
import React, { useState, useEffect } from 'react';
import { Animated, FlatList, Text, View, Dimensions, StyleSheet, processColor, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'GT',
    color: '#333',
  },
  text: {
    fontFamily: 'GT',
    fontSize: 20,
    letterSpacing: 1,
    color: '#112A32',
  },
  container: {
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    alignContent: 'space-around',
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
    marginTop: 30,
    borderRadius: 10,
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
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 300,
    justifyContent: 'space-between', // 팝업 창 내의 요소를 위아래로 분배
  },
  closeButton: {
    marginTop: 10, // 닫기 버튼과 하단 여백 설정
    
  },
});

const data = {
  labels: ["월", "화", "수", "목", "금", "토", "일"],
  datasets: [
    {
      data: [
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
      ],
    },
  ],
};

function ChartItem({ item, scrollY }) {
  const translateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const [selectedBarIndex, setSelectedBarIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBarPress = (bar) => {
    if (bar && bar.index !== undefined) {
      setSelectedBarIndex(bar.index);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View>
      <View style={styles.emptyContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontFamily: 'GT', fontSize: 18, color: '#333' }}>당신의 소비가 가장 큰 품목은?</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <ImageBackground
            source={require('./assets/images/expense.png')}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.textContainer}>이번주 지출 현황</Text>
        <BarChart
          data={item}
          width={Dimensions.get("window").width - 32}
          height={250}
          yAxisLabel=""
          yAxisSuffix="원"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            barPercentage: 0.7,
            decimalPlaces: 0,
            color: (opacity, index) => (selectedBarIndex === index ? 'red' : `rgba(255, 116, 147, ${opacity})`),
            labelColor: (opacity) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              elevation: 5,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            },
            propsForBackgroundLines: {
              stroke: 'rgba(0, 0, 0, 0.2)',
            },
          }}
          bezier
          style={{
            borderRadius: 10,
          }}
          onPress={handleBarPress}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContent}>
            <Text>팝업 창 내용</Text>
            <Button title="close" onPress={toggleModal} style={styles.closeButton} color = 'dimgrey' />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Chart() {
  const [scrollY] = useState(new Animated.Value(0));

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
    
  );

  return (
    <FlatList
      data={[data]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ChartItem item={item} scrollY={scrollY} />}
      horizontal={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    />
  );
}

export default Chart;