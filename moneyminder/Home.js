import * as Font from "expo-font";
import React, { useState, useEffect } from 'react';
import { Animated, FlatList, Text, View, Dimensions, StyleSheet, processColor } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
  },
  text: {
    fontFamily: 'GT',
    fontSize: 20,
    letterSpacing: 1,
    color: '#112A32',
  },
  container: {
    borderRadius: 10,
    elevation: 5, // 그림자 높이
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    alignContent: 'space-around',
    verticalAlign: 'middle',
    shadowRadius: 4,
    marginVertical: 4,
    marginHorizontal: 16, // 좌우 여백 조정
  },
  emptyContainer: {
    height: 250, // 그래프와 동일한 높이
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: '#F0F5E0',
    marginTop: 30,
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

  return (
    <View>
      <Animated.View style={[styles.textContainer, { transform: [{ translateY }] }]}>
        <Text style={styles.text}>이번주 지출 현황</Text>
      </Animated.View>
      <View style={styles.container}>
        <BarChart
          data={item}
          width={Dimensions.get("window").width - 32} // from react-native
          height={250}
          yAxisLabel=""
          yAxisSuffix="원"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#F0F5E0",
            backgroundGradientFrom: "#F0F5E0",
            backgroundGradientTo: "#F0F5E0",
            barPercentage: 0.7,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 0.8) => `rgba(40,119,57, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              elevation: 5,
              shadowColor: 'rgba(0,0,0,0.2)',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            },
            propsForBackgroundLines: {
              stroke: 'rgba(0,0,0,0.2)',
            },
          }}
          bezier
          style={{
            borderRadius: 20,
          }}
        />
      </View>
     
      <View style={styles.emptyContainer} />
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
