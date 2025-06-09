import { useEffect, useState } from "react";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
import Form_Login from "../forms/login";
import QN_Tabs from "@/src/components/QN_Components/QN_Tabs";
import ResetPassword from "../forms/resetPassword";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChangePassword from "../forms/changePassword";
import QN_Snackbar from "@/src/components/QN_Components/QN_Snackbar";

export default function SignIn() {
  const [tabSelected, setTabSelected] = useState("Paciente");
  const [form, setForm] = useState("login");
  const [tokenChangePassword, setTokenChangePassword] = useState("");
  const [alertPopup, setAlertPopup] = useState({
    status: "sucess",
    message: String,
  });

  const renderForm = () => {
    if (form === "login") return <Form_Login setForm={setForm} />;
    if (form === "resetPassword")
      return (
        <ResetPassword
          setTokenChangePassword={setTokenChangePassword}
          setForm={setForm}
        />
      );
    if (form === "changePassword")
      return (
        <ChangePassword
          tokenChangePassword={tokenChangePassword}
          setForm={setForm}
        />
      );
    return null;
  };

  useEffect(() => {}, [form]);

  return (
    <ImageBackground
      source={require("../../../assets/images/nutri-background.png")}
      style={style.background}
      imageStyle={{ borderRadius: 20 }}
    >
      <View style={style.container}>
        <View style={style.logoContainer}>
          <Image
            source={require("@/assets/images/QuestNutriColorInverse.png")}
            style={style.logo}
          />
        </View>
        <View style={style.formContainer}>
          {form != "login" && (
            <View style={style.divGoBack}>
              <Ionicons
                name="chevron-back"
                size={22}
                color="white"
                onPress={() => setForm("login")}
              />
            </View>
          )}
          {form == "login" && (
            <QN_Tabs
              tabs={["Paciente"]}
              value={tabSelected}
              setValue={(e) => setTabSelected(e.toString())}
            />
          )}
          {renderForm()}
        </View>
        {/* <QN_Snackbar
          status={alertPopup.status}
          message="Senha alterada com sucesso!"
          show={false}
          setShow={() => null}
        /> */}
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    alignSelf: "center",
    width: "10%",
    height: "10%",
    zIndex: 10,
    opacity: 0.7,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // gap: 80,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(85, 183, 254, 0.5)",
  },
  logoContainer: {
    width: "90%",
    height: "23%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
    // backgroundColor: "white",
    borderRadius: 20,
  },
  logo: {
    width: "81.5%",
    height: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 0,
    height: "65%",
    paddingTop: 20,
    width: "100%",
    backgroundColor: "rgba(245, 245, 245, 0.5)",
    borderRadius: 20,
  },
  divGoBack: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "5%",
    alignItems: "center",
    width: "auto",
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-start",
    borderRadius: 6,
    padding: 2,
    paddingRight: 5,
    backgroundColor: "#55b7fe",
  },
  goBackText: {
    color: "white",
    fontSize: 16,
  },
});
