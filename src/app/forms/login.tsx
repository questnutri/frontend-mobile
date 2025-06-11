import QN_Button from "@/src/components/QN_Components/QN_Button";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { login } from "@/src/lib/login";
import { fetchSelfPatient } from "@/src/lib/fetchPatients";
import { useAuth } from "@/src/context/AuthContext";
import { useUser } from "@/src/hooks/useUser";

interface Form_LoginProps {
  setForm: React.Dispatch<React.SetStateAction<string>>;
}
type Login = {
  email: string;
  password: string;
};

export default function Form_Login({ setForm }: Form_LoginProps) {
  const [usuario, setUsuario] = useState<Login>({
    email: "",
    password: "",
  });
  const { setUser } = useUser();
  const { doLogin } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await login(usuario);
      if (res.status === 200 && res.role === "patient") {
        doLogin(res.token, res.role);
        try {
          const patientData = await fetchSelfPatient();
          const userData = JSON.parse(patientData.data.request._response);
          if (patientData.status === 200) {
            setUser(userData);
            router.replace("/(drawer)/diets");
          }
        } catch (fetchError) {
          console.error("Erro ao buscar dados do paciente:", fetchError);
        }
      } else {
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <QN_Input
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e })}
          label="E-mail"
          type="email"
        />
        <QN_Input
          value={usuario.password}
          onChange={(e) => setUsuario({ ...usuario, password: e })}
          label="Senha"
          type="password"
        />
        <Text style={styles.text} onPress={() => setForm("resetPassword")}>
          Esqueci minha senha
        </Text>
      </View>
      <View style={styles.button}>
        <QN_Button width={320} onPress={() => handleLogin()}>
          Login
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
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    height: "70%",
    gap: 20,
  },
  text: {
    fontSize: 17,
    color: "white",
    fontWeight: 700,
    textAlign: "center",
  },
  button: {
    height: "20%",
    // backgroundColor: "blue",
  },
});
