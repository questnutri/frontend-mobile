import { useEffect, useState } from "react";
import { Image, ImageBackground, View, StyleSheet } from "react-native";
import Form_Login from "../forms/login";
import Form_Register from "../forms/register";
import { Video } from "expo-av";
export default function Login() {
  const [tabSelected, setTabSelected] = useState("Paciente");
  const [register, setRegister] = useState(false);

  return (
    <ImageBackground
      source={require("../../../assets/images/nutri-background.png")}
      style={style.background}
      imageStyle={{ borderRadius: 20 }}
    >
      {/* <Video
        source={require("../../../assets/videos/logoReveal_whiteBg.mp4")} // seu vídeo
        shouldPlay
        isLooping
        style={style.video}
      /> */}
      <View style={style.container}>
        <View style={style.logoContainer}>
          <Image
            source={require("@/assets/images/QuestNutriColorInverse.png")}
            style={style.logo}
          />
        </View>
        <View style={style.formContainer}>
          {!register ? (
            <Form_Login
              tabSelected={tabSelected}
              setTabSelected={setTabSelected}
              register={register}
              setRegister={setRegister}
            />
          ) : (
            <Form_Register register={register} setRegister={setRegister} />
          )}
        </View>
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
    gap: 20,
    height: "65%",
    paddingTop: 20,
    width: "100%",
    backgroundColor: "rgba(245, 245, 245, 0.5)",
    borderRadius: 20,
  },
});
