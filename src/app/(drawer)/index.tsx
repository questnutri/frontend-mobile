import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import QN_Button from "@/src/components/QN_Components/QN_Button";

export default function DrawerIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Escolha uma opção no menu</Text>

      <View style={styles.buttonContainer}>
        <QN_Button
          onPress={() => router.push("/(drawer)/diets")}
          style={styles.button}
        >
          Ver Dietas
        </QN_Button>

        <QN_Button
          onPress={() => router.push("/(drawer)/water")}
          style={styles.button}
        >
          Consumo de Água
        </QN_Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 15,
    width: "100%",
    maxWidth: 200,
  },
  button: {
    marginVertical: 5,
  },
});
