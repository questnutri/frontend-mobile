import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface QN_InputProps {
  value: string;
  onChange: (text: string) => void;
  isInvalid?: boolean;
  type?: "text" | "password" | "email";
  border?: "flat" | "outlined";
  width?: number;
  height?: number;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  textAlign?: "left" | "right" | "center";
  color?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showIcon?: boolean;
  startContent?: string;
  endContent?: string;
}

export default function QN_Input({
  value,
  onChange,
  isInvalid = false,
  type = "text",
  border = "flat",
  width = 320,
  height = 50,
  backgroundColor = "#FFF",
  fontSize = 16,
  fontWeight = "normal",
  textAlign = "left",
  color = "black",
  required = false,
  placeholder,
  disabled = false,
  label,
  errorMessage = `${label} inválido(a)!`,
  startContent,
  endContent,
}: QN_InputProps) {
  const [typeInput, setTypeInput] = useState({});

  useEffect(() => {
    if (type === "password") {
      setTypeInput({
        secureTextEntry: true,
      });
    } else if (type === "email") {
      setTypeInput({
        secureTextEntry: false,
        keyboardType: "email-address",
        autoCapitalize: "none",
        autoComplete: "email",
        textContentType: "emailAddress",
      });
    } else {
      setTypeInput({
        secureTextEntry: false,
      });
    }
  }, [type]);
  return (
    <View
      style={{
        width: width,
        // height: isInvalid ? height + 10 : height,
        display: "flex",
        justifyContent: "center",
        gap: 10,
        // borderWidth: 1,
        borderRadius: 10,
      }}
    >
      <TextInput
        mode={border}
        label={label}
        value={value}
        onChangeText={onChange}
        textColor={"black"}
        placeholder={placeholder}
        selectionColor="#181818"
        underlineColor="transparent"
        underlineStyle={{ height: 0 }}
        contentStyle={{
          backgroundColor: backgroundColor,
          fontSize: fontSize,
          fontWeight: fontWeight,
          textAlign: textAlign,
          color: color,
          fontFamily: "Montserrat-Regular",
          height: height,
          borderRadius: 12,
        }}
        style={{
          borderRadius: 12,
          backgroundColor: "rgba(245, 245, 245, 0.9)",
        }}
        theme={{
          roundness: 10,
          colors: {
            primary: "#363636",
            onSurfaceVariant: "#a3a2a2",
            error: "#fd4c4c",
          },
        }}
        error={isInvalid}
        disabled={disabled}
        {...typeInput}
        left={startContent ? <TextInput.Icon icon={startContent} /> : null}
        right={endContent ? <TextInput.Icon icon={endContent} /> : null}
      />

      {isInvalid && (
        <Text
          style={{
            color: "#fd4c4c",
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
