import * as Font from "expo-font";
import React from 'react';
import { FlatList, Text, View, Dimensions, StyleSheet, processColor } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GT',
    fontSize: 20,
    letterSpacing: 1,
    color: '#112A32',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
  },
  container: {
    borderRadius: 10,
    elevation: 5, // 그림자 높이
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    alignContent:'space-around',
    verticalAlign:'middle',
    shadowRadius: 4,
    marginVertical: 4,
    marginHorizontal: 16, // 좌우 여백 조정
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

function ChartItem({ item }) {
  return (
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
  );
}

function Chart() {
  return (
    <>
      <Text style={styles.text}>이번주 지출 현황</Text>
      <FlatList
        data={[data]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ChartItem item={item} />}
        horizontal
      />
    </>
  );
}

export default Chart;
