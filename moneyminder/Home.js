import * as Font from "expo-font";
import React, { useEffect, Component } from 'react';
import { AppRegistry,Text, View, Dimensions,StyleSheet,processColor } from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';

import {
  LineChart,
  BarChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const styles = StyleSheet.create({
  text: {
    fontFamily: 'GT',
    fontSize: 20,
    letterSpacing: 1, 
    color:'#112A32',
    marginTop: 20, 
    marginBottom: 10, 
    textAlign: 'center'
  },
});


function Chart() {
    return (
      <View>
        <Text style = {styles.text}>한 눈에 보는 내 지출</Text>
        <LineChart
          data={{
            labels: ["1월", "2월", "3월", "4월", "5월", "6월","7월","8월","9월","10월","11월","12월"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#9DAC39",
            backgroundGradientFrom: "#3CB48C",
            backgroundGradientTo: "#9DAC39",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#164131"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  }

  export default Chart;