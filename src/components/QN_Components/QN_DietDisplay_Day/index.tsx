import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import QN_Checkbox from "../QN_Checkbox";

interface QN_DietDisplay_DayProps {
  day?: number;
}

export default function QN_DietDisplay_Day({ day }: QN_DietDisplay_DayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <AntDesign name="caretright" size={22} color={"#55b7fe"} />
      </View>
      <Text style={styles.dietName}>Teste</Text>
      <View style={styles.divHours}>
        <Text style={styles.hour}>00:00</Text>
        <Feather name="clock" size={18} color={"#55b7fe"} />
      </View>
      <View style={styles.divCalories}>
        <Text style={styles.calories}>999 kcal</Text>
        <FontAwesome5 name="fire" size={18} color={"#55b7fe"} />
      </View>
      <View style={styles.checkbox}>
        <QN_Checkbox />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: "white",
    borderRadius: 6,
    gap: 5,
    boxSizing: "border-box",
  },
  icon: {
    width: "5%",
  },
  dietName: {
    color: "#55b7fe",
    fontSize: 18,
    width: "25%",
    textAlign: "left",
  },
  divHours: {
    width: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#55b7fe",
    gap: 4,
  },
  hour: {
    color: "#55b7fe",
    fontSize: 17,
  },
  divCalories: {
    width: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#55b7fe",
    gap: 4,
  },
  calories: {
    width: "55%",
    color: "#55b7fe",
    fontSize: 14,
  },
  checkbox: {
    width: "8%",
  },
});
