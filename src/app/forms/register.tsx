import QN_Button from "@/src/components/QN_Components/QN_Button";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import QN_Tabs from "@/src/components/QN_Components/QN_Tabs";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface Form_Register_Props {
  register: boolean;
  setRegister: (e: boolean) => void;
}

export default function Form_Register({
  register,
  setRegister,
}: Form_Register_Props) {
  const [userRegister, setUserRegister] = useState({
    name: "",
    phone: "",
    email: "",
    crn: "",
    issueDate: "",
  });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
        height: "80%",
        width: "100%",
      }}
    >
      <QN_Tabs
        tabs={["Nutricionista"]}
        value={"Nutricionista"}
        setValue={() => null}
      />

      <>
        <QN_Input
          value={userRegister.name}
          onChange={(e) => setUserRegister({ ...userRegister, name: e })}
          label="Nome Completo"
        />
        <QN_Input
          value={userRegister.phone}
          onChange={(e) => setUserRegister({ ...userRegister, phone: e })}
          label="Telefone/Celular"
          type="text"
        />
        <QN_Input
          value={userRegister.email}
          onChange={(e) => setUserRegister({ ...userRegister, email: e })}
          label="E-mail"
        />
        <QN_Input
          value={userRegister.crn}
          onChange={(e) => setUserRegister({ ...userRegister, crn: e })}
          type="text"
          label="CRN"
        />
        <Text
          variant="titleMedium"
          style={{
            color: "#2b2b2b",
            fontWeight: 700,
            textDecorationLine: "underline",
            fontFamily: "Montserrat-Regular",
          }}
          onPress={() => setRegister(!register)}
        >
          Já tem conta? Faça login
        </Text>
        <View style={{}}>
          <QN_Button
            colorStyle="white"
            width={350}
            onPress={() => router.replace("/(drawer)/home")}
          >
            Registrar-se
          </QN_Button>
        </View>
      </>
    </View>
  );
}
