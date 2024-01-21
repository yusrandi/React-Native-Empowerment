import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackScreenProps } from './root.navigator';
import { AboutScreen, HistoryScreen, HomeScreen, LocationScreen } from '../../presentation/screens';
import { CustomBottomTabsComponent } from '../../presentation/components';


export type TabsStackParamList = {
    home: undefined;
    history: undefined;
    about: undefined;
    location: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamList>();
export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsStackParamList, T>,
        RootStackScreenProps<"tabs">
    >;



export default function TabsNavigator() {
    return (
        <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false }}
            tabBar={(props) => <CustomBottomTabsComponent {...props} />}
        >
            <TabsStack.Screen name="home" component={HomeScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            <TabsStack.Screen name="history" component={HistoryScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            <TabsStack.Screen name="about" component={AboutScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            <TabsStack.Screen name="location" component={LocationScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            {/* <TabsStack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="user" {...props} /> }, }} /> */}

        </TabsStack.Navigator>
    )
}