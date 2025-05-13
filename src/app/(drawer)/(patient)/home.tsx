import QN_Button from "@/src/components/QN_Components/QN_Button";
import { useAuth } from "@/src/context/AuthContext";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import QN_DietDisplay_Day from "@/src/components/QN_Components/QN_DietDisplay_Day";

export const daysOfWeekBR = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
export default function Home() {
  const { getToken, isAuthenticated } = useAuth();
  const [date, setDate] = useState(new Date());
  const dateOfDiet = `${daysOfWeekBR[date.getDay()]} - ${date.getDate()}${`/${
    date.getMonth() <= 8 ? "0" : ""
  }`}${date.getMonth() + 1}`;

  const handlePress = () => {};
  const refeicoesDoDia = [
    { id: "1", nome: "Café da manhã", horario: "08:00", calorias: 300 },
    { id: "2", nome: "Almoço", horario: "12:00", calorias: 600 },
    { id: "3", nome: "Jantar", horario: "19:00", calorias: 500 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AntDesign name="caretleft" size={24} color="white" />
          <Text style={styles.dayOfWeek}>{dateOfDiet}</Text>
          <AntDesign
            name="caretright"
            size={24}
            color="white"
            onPress={() => handlePress()}
          />
        </View>
        <FlatList
          data={refeicoesDoDia}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <QN_DietDisplay_Day />}
          contentContainerStyle={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: "100%",
    padding: 10,
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    padding: 5,
    backgroundColor: "#55b7fe",
    borderRadius: 10,
    gap: 15,
  },
  header: {
    width: "100%",
    height: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
  },
  dayOfWeek: {
    fontSize: 19,
    color: "white",
  },
});
