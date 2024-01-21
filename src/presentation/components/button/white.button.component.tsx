import { View, Text, TouchableOpacityProps, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import Spacing from '../../constants/Spacing';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export default function ButtonWhite({ title, onPress, buttonStyle, textStyle }: ButtonProps) {
    const { colors } = useTheme()

    return (
        <TouchableOpacity style={[{ flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, alignItems: 'center' }, buttonStyle]} onPress={onPress}>
            <Text style={[{ marginRight: Spacing, color: colors.primary, textAlign: 'center', fontSize: FontSize.large, fontFamily: Font['poppins-regular'] }, textStyle]}>{title}</Text>
            <Ionicons name='arrow-forward-circle' size={24} color={colors.primary} />
        </TouchableOpacity>
    );
}
