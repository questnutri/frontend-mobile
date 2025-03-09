import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface QN_InputProps {
    value: string;
    onChange: (text: string) => void;
    isInvalid?: boolean;
    type?: "text" | "password";
    width?: string | number;
    height?: string | number;
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
}

export default function QN_Input({
    value,
    onChange,
    isInvalid = false,
    type = "text",
    width = "100%",
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
    errorMessage = "Campo inválido!"
}: QN_InputProps) {
    const [inputType, setInputType] = useState(type);

    return (
        <View style={{ width }}>
            {label && (
                <Text style={styles.label}>{label} {required && <Text style={styles.required}>*</Text>}</Text>
            )}
            <View style={[styles.inputContainer, { backgroundColor, height }]}>  
                <TextInput
                    style={[styles.input, { fontSize, fontWeight, textAlign, color }]}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={inputType === "password"}
                    placeholder={placeholder}
                    editable={!disabled}
                />
                {type === "password" && (
                    <TouchableOpacity onPress={() => setInputType(inputType === "password" ? "text" : "password")}> 
                        <Image
                            source={{ uri: `icons/${inputType === 'password' ? 'opened' : 'closed'}-eye2.png` }}
                            alt="toggle password visibility"
                            width={20}
                            height={20}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {isInvalid && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
        color: "black"
    },
    required: {
        color: "red",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
