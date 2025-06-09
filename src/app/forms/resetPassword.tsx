import QN_Button from "@/src/components/QN_Components/QN_Button";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import { resetPassword } from "@/src/lib/resetPassword";
import { validateTokenResetPassword } from "@/src/lib/validationTokenResetPassword";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ResetPassword_Props {
  setTokenChangePassword: React.Dispatch<React.SetStateAction<string>>;
  setForm: React.Dispatch<React.SetStateAction<string>>;
}
export default function ResetPassword({
  setTokenChangePassword,
  setForm,
}: ResetPassword_Props) {
  const [email, setEmail] = useState<string>("");

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(email);

      if (response.status === 200) {
        const resValidationToken = await validateTokenResetPassword(
          response.data.token
        );

        if (resValidationToken.status === 200) {
          setTokenChangePassword(resValidationToken.data.token);
          setForm("changePassword");
        } else {
          console.log("erro aki 1");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recuperação de Senha</Text>

      <View style={styles.inputs}>
        <QN_Input
          value={email}
          onChange={(e) => setEmail(e)}
          label="E-mail"
          type="email"
        />
      </View>
      <View style={styles.button}>
        <QN_Button width={320} onPress={handleResetPassword}>
          Enviar link de recuperação
        </QN_Button>
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
