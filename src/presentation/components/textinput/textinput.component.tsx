import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";

export default function AppTextInput({ ...otherProps }) {
  const [focused, setFocused] = useState<boolean>(false);
  const { colors } = useTheme();

  return (
    <TextInput

      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      returnKeyType="next"
      placeholderTextColor={colors.text}
      style={[
        {
          fontFamily: Font["poppins-regular"],
          fontSize: FontSize.small,
          padding: Spacing + Spacing / 2,
          backgroundColor: colors.card,
          borderRadius: Spacing,
          marginVertical: 4,
          borderWidth: 1,
          borderColor: colors.border,
        },
        focused && {
          borderWidth: 3,
          borderColor: 'black',
          shadowOffset: { width: 4, height: Spacing },
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowRadius: Spacing,
        },
      ]}
      {...otherProps}
    />
  );
}

