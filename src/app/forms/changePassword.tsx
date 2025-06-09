import QN_Button from "@/src/components/QN_Components/QN_Button";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChangePassword_Props {
  tokenChangePassword: string;
  setForm: React.Dispatch<React.SetStateAction<string>>;
}
export default function ChangePassword({
  tokenChangePassword,
  setForm,
}: ChangePassword_Props) {
  const [newPassword, setNewPassword] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Digite sua nova senha</Text>

      <View style={styles.inputs}>
        <QN_Input
          value={newPassword}
          onChange={(e) => setNewPassword(e)}
          label="Nova senha"
          type="password"
        />
      </View>
      <View style={styles.button}>
        <QN_Button width={320}>Enviar</QN_Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputs: {
    display: "flex",
    justifyContent: "center",
    height: "30%",
    gap: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
  button: {
    height: "20%",
  },
});
