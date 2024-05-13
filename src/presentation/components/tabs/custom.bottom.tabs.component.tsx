import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import { ParamListBase, useTheme } from "@react-navigation/native";
import Font from "../../constants/Font";

const CustomBottomTabsComponent = (props: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.card }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        {props.state.routes.map((route, i) => {
          const isActive = i == props.state.index;
          return (
            <TabItem
              key={i}
              isActive={isActive}
              routeName={route.name}
              navigation={props.navigation}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CustomBottomTabsComponent;

const TabItem = ({
  routeName,
  isActive,
  navigation,
}: {
  routeName: string;
  isActive: boolean;
  navigation: any;
}) => {
  const { colors } = useTheme();

  const onTap = () => {
    navigation.navigate(routeName);
  };

  return (
    <Pressable
      onPress={onTap}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingVertical: 8,
      }}
    >
      <View
        style={[
          {
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
            backgroundColor: isActive ? colors.primary : "transparent",
          },
        ]}
      >
        <FontAwesome
          name={
            routeName === "home"
              ? "home"
              : routeName === "history"
                ? "paperclip"
                : routeName === "about"
                  ? "newspaper-o"
                  : routeName === "location"
                    ? "paper-plane-o"
                    : "wechat"
          }
          size={20}
          color={isActive ? colors.card : colors.text}
          style={{
            opacity: isActive ? 1 : 0.5,
          }}
        />

      </View>

      <Text
        style={{
          marginLeft: 4,
          fontSize: 16,
          fontWeight: "600",
          color: isActive ? colors.primary : colors.text,
          fontFamily: Font['poppins-regular']
        }}
      >
        {routeName}
      </Text>

    </Pressable>
  );
};
