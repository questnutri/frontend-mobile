import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface QN_TextAreaProps {
    value: string;
    onChange: (text: string) => void;

    label?: string;
    minHeight?: number;
    maxHeight?: number;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    isSelected?: boolean;
    textAlign?: "left" | "right" | "center" | "justify";

    fontSizeLabel?: number;
    fontColorLabel?: string;
    fontWeightLabel?: "normal" | "bold";

    height?: number;
}

export default function QN_TextArea({
    value,
    onChange,
    label,
    minHeight = 80,
    maxHeight = 200,
    disabled = false,
    readOnly = false,
    placeholder,
    isSelected = false,
    textAlign = "left",

    fontSizeLabel = 15,
    fontColorLabel = "black",
    fontWeightLabel = "normal",
    height,
}: QN_TextAreaProps) {
    return (
        <View style={styles.container}>
            {label && (
                <Text
                    style={[
                        styles.label,
                        { fontSize: fontSizeLabel, color: fontColorLabel, fontWeight: fontWeightLabel },
                    ]}
                >
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    styles.textArea,
                    {
                        textAlign: textAlign,
                        minHeight: isSelected ? minHeight * 2 : minHeight,
                        maxHeight: isSelected ? maxHeight * 2 : maxHeight,
                        height: height,
                    },
                ]}
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                editable={!disabled && !readOnly}
                multiline
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
});
