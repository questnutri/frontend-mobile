import { Drawer } from "expo-router/drawer";
import { Image, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import QN_Button from "@/src/components/QN_Components/QN_Button";
import { logout } from "@/src/lib/logout";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";

export default function DrawerLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        router.replace("/(auth)"); // Redireciona para login se não houver token
      } else {
        setCheckingAuth(false); // Libera para renderizar Drawer
      }
    };

    verifyToken();
  }, []);
  return (
    <Drawer
      screenOptions={{
        headerTitle: () => (
          <Image
            source={require("../../../assets/images/logo_vector.png")}
            style={{
              width: 170,
              height: 60,
              resizeMode: "contain",
              marginBottom: 40,
              marginLeft: 5,
            }}
          />
        ),
        headerLeft: undefined,
        headerTintColor: "#55b7ff",
        drawerStyle: {
          backgroundColor: "white",
          width: "80%",
        },
        headerStyle: {
          height: 70,
        },
        headerLeftContainerStyle: {
          height: 0,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    />
  );
}

function CustomDrawerContent({ navigation }) {
  const { getRole, doLogout } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logout(getRole() as string);
      if (response.status === 204 || response.status === 401) {
        doLogout();
        router.replace("/(auth)");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Header Navbar */}
      <View
        style={{
          alignItems: "center",
          height: "20%",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "#f1f1f1",
            padding: 10,
            borderRadius: 60,
          }}
        >
          <Image
            source={require("../../../assets/images/logo_vector.png")}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Montserrat-Regular",
          }}
        >
          Usuário Exemplo
        </Text>
      </View>
      {/* Menu Items */}
      <View style={{ height: "60%", paddingTop: 30, paddingLeft: 10, gap: 0 }}>
        <Text
          onPress={() => router.navigate("/(drawer)/home")}
          style={styles.menuItem}
        >
          Home
        </Text>
        <Text
          onPress={() => navigation.navigate("profile")}
          style={styles.menuItem}
        >
          Perfil
        </Text>
        <Text
          onPress={() => navigation.navigate("settings")}
          style={styles.menuItem}
        >
          Configurações
        </Text>
      </View>
      {/* Footer Navbar */}
      <View
        style={{
          height: "20%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/logo_vector.png")}
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
          }}
        />
        <QN_Button
          onPress={() => handleLogout()}
          style={[styles.menuItem, { marginTop: 40, color: "red" }]}
          colorStyle="red"
          width={100}
          height={45}
        >
          Sair
        </QN_Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    fontSize: 19,
    marginVertical: 10,
    fontFamily: "Montserrat-Regular",
  },
});
