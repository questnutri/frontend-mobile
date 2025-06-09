import QN_Button from "@/src/components/QN_Components/QN_Button";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { login } from "@/src/lib/login";

interface Form_LoginProps {
  setForm: React.Dispatch<React.SetStateAction<string>>;
}
type Login = {
  email: string;
  password: string;
};

export default function Form_Login({ setForm }: Form_LoginProps) {
  const [user, setUser] = useState<Login>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // router.replace("/(drawer)/diets");
    try {
      const res = await login(user);
      if (res.status === 200) {
        router.replace("/(drawer)/diets");
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
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e })}
          label="E-mail"
          type="email"
        />
        <QN_Input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e })}
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
