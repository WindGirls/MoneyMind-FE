import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import axios from 'axios';

const E_popup = () => {
  const [categoryExpensesData, setCategoryExpensesData] = useState([]);
  const [largestCategory, setLargestCategory] = useState('');
  const [largestCategoryPercentage, setLargestCategoryPercentage] = useState(0);
  const [largestCategoryAmount, setLargestCategoryAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.20.10.2:8080/api/report/users/1/category-expenses-percent`);
        const categoryExpenses = response.data;

        // 데이터 확인
        console.log(categoryExpenses);

        // 가장 큰 지출 카테고리와 퍼센티지 찾기
        let maxPercentage = 0;
        let largestCategoryName = '';
        let largestCategoryAmt = 0;
        for (const category of categoryExpenses) {
          if (category.percentage > maxPercentage) {
            maxPercentage = category.percentage;
            largestCategoryName = category.category;
            largestCategoryAmt = category.amount;
          }
        }
        setLargestCategory(largestCategoryName);
        setLargestCategoryPercentage(maxPercentage);
        setLargestCategoryAmount(largestCategoryAmt);

        // 핑크 계열의 색상 배열 정의
        const pinkColors = ['#FFC0CB', '#FF69B4', '#FF1493', '#DB7093', '#C71585'];

        // 데이터 전처리: 각 카테고리별 percentage 값만 추출하여 새로운 배열 생성
        const pieData = categoryExpenses.map((item, index) => ({
          value: item.percentage, // percentage 값을 value로 사용
          color: pinkColors[index % pinkColors.length], // 핑크 계열의 다른 톤의 색상 할당
          gradientCenterColor: pinkColors[index % pinkColors.length], // 같은 색상으로 설정
          focused: true,
          category: `${item.category}: ${item.percentage}% (${item.amount}원)` // 카테고리 정보 및 퍼센티지를 표시하는 문자열
        }));

        // 전처리된 데이터 확인
        console.log(pieData);

        setCategoryExpensesData(pieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <PieChart
        data={categoryExpensesData}
        donut
        showGradient
        sectionAutoFocus
        radius={90}
        innerRadius={60}
        innerCircleColor={'#FFF0F0'}
        centerLabelComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
              {largestCategoryPercentage || 0}%
            </Text>
            <Text style={{ fontSize: 14, color: 'black' }}>{largestCategory}</Text>
            <Text style={{ fontSize: 14, color: 'black' }}>{largestCategoryAmount}원</Text>
          </View>
        )}
        sectionsStyle={{ textStyle: { fontSize: 12, color: 'black', fontWeight: 'bold' } }} // 수정된 부분: 섹션 텍스트 스타일 설정
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
