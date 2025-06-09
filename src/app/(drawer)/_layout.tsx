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
    // const verifyToken = async () => {
    //   const token = await SecureStore.getItemAsync("token");
    //   if (!token) {
    //     router.replace("/(auth)"); // Redireciona para login se não houver token
    //   } else {
    //     setCheckingAuth(false); // Libera para renderizar Drawer
    //   }
    // };
    // verifyToken();
  }, []);
  return (
    <Drawer
      screenOptions={{
        headerTitle: () => (
          <Image
            source={require("../../../assets/images/logo_vector.png")}
            style={{
              width: 150,
              height: 50,

              marginBottom: 40,
              marginLeft: 5,
            }}
            resizeMode="contain"
          />
        ),
        headerLeft: undefined,
        headerTintColor: "#55b7ff",
        drawerStyle: {
          backgroundColor: "white",
          width: "80%",
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: "white",
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
    // try {
    //   console.log("Logging out...");
    //   doLogout();
    //   const response = await logout();
    //   if (response.status === 204 || response.status === 401) {
    //     doLogout();
    //     router.replace("/(auth)");
    //   }
    // } catch (error) {
    //   console.error("Logout error:", error);
    // }
    router.replace("/(auth)");
  };

  return (
    <View style={styles.container}>
      {/* Header Navbar */}
      <View style={styles.headerNavbar}>
        <View style={styles.headerNavbarImage}>
          <Image
            source={require("../../../assets/images/logo_vector.png")}
            style={styles.headerUserImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerNavbarText}>Usuário Exemplo</Text>
      </View>
      {/* Menu Items */}
      <View style={styles.bodyNavbar}>
        <Text
          onPress={() => router.navigate("/(drawer)/diets")}
          style={styles.menuItem}
        >
          Dietas
        </Text>
        <Text
          onPress={() => router.navigate("/(drawer)/water")}
          style={styles.menuItem}
        >
          Consumo de água
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
          style={styles.footerImage}
          resizeMode="contain"
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
  container: {
    flex: 1,
    padding: 20,
  },
  headerNavbar: {
    alignItems: "center",
    height: "20%",
  },
  headerNavbarImage: {
    borderWidth: 1,
    borderColor: "#f1f1f1",
    padding: 10,
    borderRadius: 60,
  },
  headerUserImage: {
    width: 50,
    height: 50,
  },
  headerNavbarText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Montserrat-Regular",
  },
  bodyNavbar: {
    height: "60%",
    paddingTop: 30,
    paddingLeft: 10,
    gap: 0,
  },
  footerImage: {
    width: 120,
    height: 120,
  },
});
