import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AppTextInputAuth({ icon, style, ...otherProps }: any) {
  const [focused, setFocused] = useState<boolean>(false);
  const { colors } = useTheme();

  return (
    <View style={[
      {
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: Spacing * Spacing,
        alignItems: 'center',
        paddingHorizontal: Spacing
      },
      focused && {
        borderWidth: 3,
        borderColor: 'black',
        shadowOffset: { width: 4, height: Spacing },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: Spacing,
      },

    ]}>
      <MaterialIcons name={icon} size={18} color={colors.text} />
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="next"
        placeholderTextColor={colors.text}
        style={[
          {
            marginLeft: Spacing,
            flex: 1,
            fontFamily: Font["poppins-regular"],
            fontSize: FontSize.medium,
            // padding: Spacing + Spacing / 2,
            // backgroundColor: colors.card,
            // borderRadius: Spacing * Spacing,
          },

        ]}
        {...otherProps}
      />
    </View>
  );
}

