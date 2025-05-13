import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IUserCard {
  name: string;
  email: string;
  dateOfBirth: string;
  phone: string;
}

export default function UserCard({
  name,
  email,
  dateOfBirth,
  phone,
}: IUserCard) {
  return (
    <View style={styles.container}>
      <View style={styles.itemRow}>
        <MaterialCommunityIcons name="account" size={20} color="white" />
        <Text style={styles.itemText}>{name}</Text>
      </View>
      <View style={styles.itemRow}>
        <MaterialCommunityIcons name="email" size={20} color="white" />
        <Text style={styles.itemText}>{email}</Text>
      </View>
      <View style={styles.itemRow}>
        <MaterialCommunityIcons name="calendar" size={20} color="white" />
        <Text style={styles.itemText}>{dateOfBirth}</Text>
      </View>
      <View style={styles.itemRow}>
        <MaterialCommunityIcons name="phone" size={20} color="white" />
        <Text style={styles.itemText}>{phone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    padding: 10,
    backgroundColor: "#55b7fe",
    borderWidth: 1,
    borderColor: "#878686",
    borderRadius: 8,
    gap: 12,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemText: {
    fontSize: 17,
    color: "white",
  },
});
