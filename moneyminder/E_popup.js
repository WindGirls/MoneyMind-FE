import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const E_popup = () => {
  // PieChart에 필요한 데이터
  const pieData = [
    {
      value: 47,
      color: '#FF5675',
      gradientCenterColor: '#FF5675',
      focused: true,
    },
    { value: 40, color: '#FF8E99', gradientCenterColor: '#FF8E99' },
    { value: 16, color: '#FFB6C1', gradientCenterColor: '#FFB6C1' },
    { value: 3, color: '#FFDEE9', gradientCenterColor: '#FFDEE9' },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        radius={90}
        innerRadius={60}
        innerCircleColor={'#FFF0F0'}
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                47%
              </Text>
              <Text style={{ fontSize: 14, color: 'black' }}>카페</Text>
            </View>
            
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
  },
});

export default E_popup;
