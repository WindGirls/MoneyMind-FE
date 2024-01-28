import React, { useState } from 'react';
import { Calendar as RNCalendar } from 'react-native-calendars';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <RNCalendar
      onDayPress={onDayPress}
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: 'blue' },
      }}
    />
  );
};

export default Calendar;
