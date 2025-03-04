import { ReactNode } from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface QN_ButtonProps {
    colorStyle?: 'blue' | 'white' | 'red';
    width?: number;
    height?: number;
    blocked?: boolean;
    isLoading?: boolean;
    borderRadius?: number;
    fontSize?: number;
    marginTop?: number;
    children?: React.ReactNode;
    noShadow?: boolean;
    onPress?: () => void;
}

export default function QN_Button({
    colorStyle = 'blue',
    width = 200,
    height = 50,
    blocked,
    isLoading,
    borderRadius = 8,
    fontSize = 16,
    children,
    marginTop,
    noShadow = false,
    onPress
}: QN_ButtonProps) {
    const buttonStyles = {
        backgroundColor: colorStyle === 'blue' ? '#23a3ff' : colorStyle === 'red' ? '#FF0000' : 'white',
        borderRadius: borderRadius,
        opacity: blocked || isLoading ? 0.5 : 1,
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={blocked || isLoading}
            style={[
                styles.button,
                buttonStyles,
                { width, height, marginTop },
                noShadow ? {} : styles.shadow,
            ]}
        >
            <Text style={[styles.text, { fontSize, color: colorStyle === 'white' ? '#23a3ff' : 'white' }]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
    shadow: {
        elevation: 3, // Sombra no Android
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3, // Sombra no iOS
    },
    text: {
        fontWeight: '600',
    },
});