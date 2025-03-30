import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface QN_TimeInputProps {
  label?: string;
  value: string;
  onChange: (time: string) => void;
  color?: 'black' | 'white' | '#55b7fe';
}

const QN_TimeInput = ({ label, value, onChange, color = 'black' }: QN_TimeInputProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();

  // Converte string "HH:MM" para Date
  const stringToDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Converte Date para string "HH:MM"
  const dateToString = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Lida com a alteração da hora no DateTimePicker
  const handleTimeChange = useCallback(
    (_event: any, selectedDate?: Date) => {
      setShowPicker(false);
      if (selectedDate) {
        const newTime = dateToString(selectedDate);
        onChange(newTime); // Passa a hora no formato "HH:MM"
      }
    },
    [onChange]
  );

  const textColor = colorScheme === 'dark' ? '#fff' : color;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}

      <TouchableOpacity
        onPress={() => setShowPicker(true)} // Abre o picker ao clicar no campo
        style={[styles.inputContainer, { borderColor: color }]}
      >
        <FontAwesome name="clock-o" style={styles.icon} />
        <Text style={[styles.timeText, { color: textColor }]}>{value}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={stringToDate(value)} // Converte a string para Date ao passar como value
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    color: '#55b7fe',
    fontSize: 22,
    marginRight: 5,
  },
  timeText: {
    fontSize: 16,
  },
});

export default QN_TimeInput;
