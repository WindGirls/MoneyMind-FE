
import React, { useState, useEffect } from 'react';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const getCategoryEmoji = (category) => {
  // 카테고리에 따라 이모지를 반환하는 함수
  switch (category) {
    case 'Food':
      return '🍔';
    case 'Transportation':
      return '🚗';
    case 'Shopping':
      return '🛍️';
    // 추가적인 카테고리에 대한 이모지 지정 가능
    default:
      return '❓';
  }
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [expenseData, setExpenseData] = useState({
    '2022-01-25': [
      { id: '1', category: 'Food', amount: 20 },
      { id: '2', category: 'Transportation', amount: 15 },
      { id: '3', category: 'Shopping', amount: 30 },
    ],
    '2022-01-30': [
      { id: '1', category: 'Food', amount: 20000 },
      { id: '2', category: 'Transportation', amount: 15 },
    ],
    // ... 기타 날짜에 대한 더미 지출 내역
  });

  useEffect(() => {
    const fetchDummyData = async () => {
      const dummyData = await fetchExpenseDataForDate(selectedDate);
      setExpenseData((prevData) => ({
        ...prevData,
        [selectedDate]: dummyData,
      }));
    };
    // 선택된 날짜가 있을 때만 데이터를 업데이트
    if (selectedDate) {
      fetchDummyData();
    }

    fetchDummyData();
  }, [selectedDate]);

  const onDayPress = async (day) => {
    setSelectedDate(day.dateString);
    const expenseDataForSelectedDate = await fetchExpenseDataForDate(day.dateString);
    setExpenseData({ ...expenseData, [day.dateString]: expenseDataForSelectedDate });
  };

  const fetchExpenseDataForDate = async (selectedDate) => {
    const generateRandomExpenseItem = (id) => ({
      id,
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 100),
    });
  
    const categories = ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Others'];
    const dummyData = Array.from({ length: 3 }, (_, index) => generateRandomExpenseItem(index + 1));
    
    return dummyData;
    // return [
    //   { id: '1', category: 'Food', amount: 20 },
    //   { id: '2', category: 'Transportation', amount: 15 },
    //   { id: '3', category: 'Shopping', amount: 30 },
    //   // ... 기타 지출 내역
    // ];
  };

  const renderExpenseItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
      <Text style={styles.categoryText}>{getCategoryEmoji(item.category)}</Text>
      <Text style={{ fontSize: 16 }}>{item.category}</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`$${item.amount}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RNCalendar onDayPress={onDayPress} markedDates={{ [selectedDate]: { selected: true, selectedColor: '#FF1493' } }} />
      <View style={{ marginTop: 16 }}>

   {expenseData[selectedDate] && (
  <View style={styles.container2}>
    <Text style={styles.titleText}>{`지출 내역 for ${selectedDate}`}</Text>
    <FlatList
      data={expenseData[selectedDate]}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  </View>
)}
{!expenseData[selectedDate] && (
  <View style={styles.container2}>
    <Text style={styles.titleText}>{`지출 내역 for ${selectedDate}`}</Text>
    <Text style={{ textAlign: 'center' }}>지출 내역이 없습니다.</Text>
  </View>
)}



      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  expenseListContainer: {
    marginTop: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryText: {
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container2: {
    backgroundColor: "#ffffff",
  },
  emoji: {
    fontSize: 36,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Calendar;
