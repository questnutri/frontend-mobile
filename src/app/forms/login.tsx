// import QN_Input from "@/src/components/QN_Components/QN_Input";
import QN_Button from "@/src/components/QN_Components/QN_Button";
import QN_Input from "@/src/components/QN_Components/QN_Input";
import QN_Tabs from "@/src/components/QN_Components/QN_Tabs";
import { fetchData } from "@/src/lib/fetchData";
import { login } from "@/src/lib/login";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAuth } from "@/src/context/AuthContext";
import { jwtDecode } from "jwt-decode";

type MyTokenPayload = {
  role: string;
};

interface Form_Login_Props {
  tabSelected: string;
  setTabSelected: (e: string) => void;
  register: boolean;
  setRegister: (e: boolean) => void;
}

export default function Form_Login({
  tabSelected,
  setTabSelected,
  register,
  setRegister,
}: Form_Login_Props) {
  const { doLogin, getToken, isAuthenticated } = useAuth();
  const [loginInvalid, setLoginInvalid] = useState({
    email: false,
    password: false,
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const tabSelectedEnglish =
    tabSelected === "Nutricionista" ? "nutritionist" : "patient";

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await login(tabSelectedEnglish, {
        email: userLogin.email,
        password: userLogin.password,
      });

      switch (response.status) {
        case 200:
          if (response.token) {
            const decodedToken = jwtDecode<MyTokenPayload>(response.token);
            const role = decodedToken.role;
            doLogin(response.token, role);
            router.replace(`../(drawer)/(${role})/home`);
          }
          break;
        case 401:
          setLoginInvalid({ ...loginInvalid, password: true });
          break;
        case 404:
          setLoginInvalid({ ...loginInvalid, email: true });
          break;
      }
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: !loginInvalid.email ? 30 : 40,
        height: "80%",
        minHeight: "50%",
        width: "100%",
      }}
    >
      <QN_Tabs
        tabs={["Nutricionista", "Paciente"]}
        value={tabSelected}
        setValue={(e) => setTabSelected(e.toString())}
      />

      <>
        <QN_Input
          value={userLogin.email}
          onChange={(e) => {
            setUserLogin({ ...userLogin, email: e });
            setLoginInvalid({ ...loginInvalid, email: false });
          }}
          label="E-mail"
          isInvalid={loginInvalid.email}
          type="email"
        />
        <QN_Input
          value={userLogin.password}
          onChange={(e) => {
            setUserLogin({ ...userLogin, password: e });
            setLoginInvalid({ ...loginInvalid, password: false });
          }}
          isInvalid={loginInvalid.password}
          type="password"
          label="Senha"
        />
        <Text
          variant="titleMedium"
          style={{
            color: "white",
            fontWeight: 700,
            textDecorationLine: "underline",
            fontFamily: "Montserrat-Regular",
          }}
        >
          Esqueci minha senha
        </Text>
        {tabSelected === "Nutricionista" && (
          <Text
            variant="titleMedium"
            style={{
              color: "white",
              fontWeight: 700,
              fontFamily: "Montserrat-Regular",
            }}
            onPress={() => setRegister(!register)}
          >
            Não tem conta? Registre-se
          </Text>
        )}
      </>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          height: tabSelected !== "Nutricionista" ? "53.5%" : "40%",
          width: "100%",
          paddingTop: 30,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 10,
            paddingBottom: 20,
          }}
        >
          <QN_Button
            colorStyle="white"
            width={350}
            onPress={() => handleLogin()}
            isLoading={loading}
          >
            Login
          </QN_Button>
          <QN_Button
            colorStyle="white"
            width={350}
            onPress={() =>
              console.log("Token at Login availability: ", getToken())
            }
            isLoading={loading}
          >
            Test Token
          </QN_Button>
          <QN_Button
            colorStyle="white"
            width={350}
            onPress={() => console.log("Authenticated: ", isAuthenticated)}
          >
            Test Authenticated
          </QN_Button>
        </View>
      </View>
    </View>
  );
}
