import React, { useEffect, useRef, useState } from "react";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Animated, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function QN_Switch() {
  const [isOn, setIsOn] = useState(true);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? 320 : 10,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  return (
    <TouchableOpacity
      onPress={() => setIsOn(!isOn)}
      style={{
        width: 370,
        height: 45,
        borderRadius: 20,
        backgroundColor: isOn ? "#55b7fe" : "#737373",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        position: "relative",
      }}
    >
      {isOn ? <Ionicons name="nutrition" size={26} color="white" /> : null}
      <Text
        style={{
          color: "#fff",
          fontWeight: "700",
          flex: 1,
          textAlign: "center",
          paddingLeft: isOn ? 0 : 25, // ajusta o padding baseado no estado
          paddingRight: isOn ? 25 : 0, // ajusta o padding baseado no estado
        }}
      >
        {isOn ? "Nutricionista" : "Paciente"}
      </Text>
      {isOn ? null : <FontAwesome name="user" size={26} color="white" />}
      <Animated.View
        style={{
          backgroundColor: "white",
          width: 30,
          height: 30,
          borderRadius: 50,
          position: "absolute",
          top: 7.5,
          left: translateX,
        }}
      />
    </TouchableOpacity>
  );
}
