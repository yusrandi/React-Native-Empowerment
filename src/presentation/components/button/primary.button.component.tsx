import { View, Text, TouchableOpacityProps, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export default function ButtonPrimary({ title, onPress, buttonStyle, textStyle }: ButtonProps) {
    const { colors } = useTheme()

    return (
        <TouchableOpacity style={[{ backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }, buttonStyle]} onPress={onPress}>
            <Text style={[{ color: 'white', textAlign: 'center', fontSize: 18 }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}
