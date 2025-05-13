import QN_Button from "@/src/components/QN_Components/QN_Button";
import { useAuth } from "@/src/context/AuthContext";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import UserCard from "@/src/components/QN_Components/QN_UserCard";
import { IPatient } from "@/src/models/Patient/Patient.interface";
import { useEffect, useState } from "react";
import { fetchPatients } from "@/src/lib/fetchPatients";

export default function Home() {
  const { getToken, isAuthenticated } = useAuth();
  const [patients, setPatients] = useState<IPatient[]>([]);

  const refreshList = async () => {
    const data = await fetchPatients();
    setPatients(data);
  };

  useEffect(() => {
    refreshList();
  }, []);

  console.log(patients);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Controle de Pacientes</Text>
      </View>
      <View style={styles.content}>
        <QN_Input
          value=""
          onChange={() => null}
          label="Termos de Pesquisa"
          startContent="magnify"
          border="outlined"
        />
        <Text style={styles.register}>Registros</Text>

        <ScrollView
          style={styles.records}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.cards}>
            <UserCard
              name="Lucas"
              email="lucas@email.com"
              dateOfBirth="01/07/2000"
              phone="(19)9 9535-8551"
            />
            <UserCard
              name="Lucas"
              email="lucas@email.com"
              dateOfBirth="01/07/2000"
              phone="(19)9 9535-8551"
            />
            <UserCard
              name="Lucas"
              email="lucas@email.com"
              dateOfBirth="01/07/2000"
              phone="(19)9 9535-8551"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#55b7fe",
    height: "100%",
    width: "100%",
  },
  header: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "96%",
    height: "89%",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  title: {
    fontFamily: "Montserrat-Regular",
    fontSize: 23,
    fontWeight: 900,
    color: "white",
  },
  records: {
    width: "100%",
    flex: 1, // permite que o ScrollView cresça no espaço disponível
  },

  scrollContent: {
    paddingBottom: 20, // para evitar que o conteúdo fique cortado no final
  },

  cards: {
    width: "100%",
    alignItems: "center",
  },

  register: {
    fontSize: 17,
    paddingLeft: 10,
    marginTop: 10,
    width: "100%",
  },
});
