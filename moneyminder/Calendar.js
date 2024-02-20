import React, { useState, useEffect } from 'react';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExpenseModel from './frontendExpenseModel'; // 실제 파일 경로로 수정 필요
import axios from 'axios';



const getCategoryEmoji = (category) => {
  switch (category) {
    case 1:
      return '🍔';
    case 2:
      return '🚗';
    case 3:
      return '🛍️';
    default:
      return '❓';
  }
};

const Calendar = () => {
  const [data, setData] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [expenseData, setExpenseData] = useState([]);


  const onDayPress = async (day) => {
    setSelectedDate(day.dateString);
    const expenseDataForSelectedDate = await fetchUrl(day.dateString);
    //여기?
    console.log("expenseDataForSelectedDate", expenseDataForSelectedDate);
    setExpenseData({ ...expenseData, [day.dateString]: expenseDataForSelectedDate });
    console.log("expenseData", response.data);
  };

  useEffect(() => {
    fetchUrl();
  }, []);



  async function fetchUrl(selectedDate) {
    console.log("-----fetchUrl--------");

    try {
      console.log(`http://172.20.10.2:8080/api/account/` + `${selectedDate}` + `/` + `1`);
      const baseURL = `http://172.20.10.2:8080/api/account/` + `${selectedDate}` + `/` + `1`;
      const response = await axios.get(baseURL);
      setExpenseData(response.data);
      const json = response.data;
      console.log('Response:', json);
      console.log('Fetched all expense data:', expenseData);
      return response.data;
    }
    catch (error) {
      console.warn("🤬", error);
      console.error("에러 발생", error);
      return []; // 또는 다른 처리 방법 적용
    }
  }


  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.categoryText}>{getCategoryEmoji(item.place)}</Text>
      <Text style={{ fontSize: 16 }}>{item.category}</Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`Deposit: ${item.deposit}, Withdrawal: ${item.withdrawal}, Place: ${typeof item.place === 'number' ? getCategoryEmoji(item.place) : item.place}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RNCalendar onDayPress={onDayPress} markedDates={{ [selectedDate]: { selected: true, selectedColor: '#FF1493' } }} />
      <View style={{ marginTop: 16 }}>
        {expenseData && (
          <View style={styles.container2}>
            <Text style={styles.titleText}>{`지출 내역 for ${selectedDate}`}</Text>
            <FlatList
              data={expenseData[selectedDate]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderExpenseItem}
            />
          </View>
        )}
        {!expenseData && (
          <Text style={{ textAlign: 'center' }}>지출 내역이 없습니다.</Text>
        )}
      </View>
    </View>
  );
}

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
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  container2: {
    backgroundColor: '#ffffff',
  },
});

export default Calendar;
