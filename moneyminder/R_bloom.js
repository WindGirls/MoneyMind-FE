import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RewardChart() {

  const [stickerPanels, setStickerPanels] = useState(Array.from({ length: 4 }, () => Array.from({ length: 5 }).fill(false)));

  useEffect(() => {
    const loadStickerPanels = async () => {
      try {
        const savedStickerPanels = await AsyncStorage.getItem('stickerPanels');
        if (savedStickerPanels !== null) {
          setStickerPanels(JSON.parse(savedStickerPanels));
        }
      } catch (error) {
        console.error('Error loading sticker panels:', error);
      }
    };

    loadStickerPanels();
  }, []);

  useEffect(() => {
    const saveStickerPanels = async () => {
      try {
        await AsyncStorage.setItem('stickerPanels', JSON.stringify(stickerPanels));
      } catch (error) {
        console.error('Error saving sticker panels:', error);
      }
    };

    saveStickerPanels();
  }, [stickerPanels]);

  const toggleSticker = (rowIndex, colIndex) => {
    const updatedStickerPanels = [...stickerPanels];
    updatedStickerPanels[rowIndex][colIndex] = !updatedStickerPanels[rowIndex][colIndex];
    setStickerPanels(updatedStickerPanels);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>머니 블룸</Text>
      <View style={styles.chart}>
        {stickerPanels.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((isStickered, colIndex) => (
              <TouchableOpacity key={colIndex} onPress={() => toggleSticker(rowIndex, colIndex)} style={[styles.cell, isStickered && styles.stickered]}>
                {isStickered && <Text style={styles.sticker}>🌸</Text>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'column', // 열 방향으로 배치
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row', // 행 방향으로 배치
  },
  cell: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    margin: 5,
  },
  stickered: {
    backgroundColor: 'lightpink', // 스티커가 붙은 셀의 배경색 변경
  },
  sticker: {
    fontSize: 40,
  },
});

export default RewardChart;
