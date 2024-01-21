import { View, Text, ActivityIndicator, Image, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer, NavigatorScreenParams, useTheme } from '@react-navigation/native';
import TabsNavigator, { TabsStackParamList } from './tabs.navigator';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomDefaultTheme } from '../../presentation/themes/AppThemes';
import { DetailScreen, LoginScreen, ProfileScreen, RegisterScreen, Step1Screen, Step2Screen, Step3Screen, Step4Screen, Step5Screen } from '../../presentation/screens';
import { AuthUserContext } from '../context/auth.context';

import auth from '@react-native-firebase/auth';
import { usersDatabaseRef } from '../utils/firebase';
import { UserEntity, emptUser } from '../../domain/entities/user.entity';
import { womanImage } from '../../presentation/assets';
import SplashScreen from 'react-native-splash-screen';
import { ReportEntity } from '../../domain';



export type RootStackParamList = {
    tabs: NavigatorScreenParams<TabsStackParamList>;
    login: undefined
    register: undefined
    step1: undefined
    step2: undefined
    step3: undefined
    step4: undefined
    step5: undefined
    profile: undefined
    detail: {
        item: ReportEntity
    }
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;


function AuthStack() {
    return (
        <RootStack.Navigator initialRouteName="login">
            <RootStack.Screen
                name="login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="register"
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />

        </RootStack.Navigator>
    )
}

function UserStack() {
    return (
        <RootStack.Navigator initialRouteName="tabs">
            <RootStack.Screen
                name="tabs"
                component={TabsNavigator}
                options={{
                    headerShown: false,
                }}

            />
            <RootStack.Screen
                name="step1"
                component={Step1Screen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom'
                }}

            />
            <RootStack.Screen
                name="step2"
                component={Step2Screen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}

            />
            <RootStack.Screen
                name="step3"
                component={Step3Screen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}

            />
            <RootStack.Screen
                name="step4"
                component={Step4Screen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}

            />
            <RootStack.Screen
                name="step5"
                component={Step5Screen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}

            />
            <RootStack.Screen
                name="detail"
                component={DetailScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom'
                }}

            />
            <RootStack.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom'
                }}

            />

        </RootStack.Navigator>
    )
}

export default function RootNavigator() {

    const { user, setUser } = useContext(AuthUserContext)
    const [loading, setLoading] = useState(true)
    const { colors } = useTheme()

    useEffect(() => {
        console.log({ user });
        const unsubscribe = auth().onAuthStateChanged(async authenticatedUser => {
            if (authenticatedUser) {
                usersDatabaseRef
                    .child(authenticatedUser.uid)
                    .once('value')
                    .then(snapshot => {
                        setLoading(false)
                        console.log('User data: ', snapshot.val());
                        const userType: UserEntity = snapshot.val() as UserEntity
                        setUser(userType)
                    })
                    .catch(error => console.log(error))
            } else {
                setUser(emptUser)
            }
            setLoading(false)

        })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6A3DE8' }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle='light-content'
                />
                {/* <Image source={womanImage} style={{ height: 100, resizeMode: 'contain' }} /> */}
                <ActivityIndicator size={'large'} color={'white'} />
            </View>
        )
    }

    return (
        <NavigationContainer theme={CustomDefaultTheme} onReady={() => SplashScreen.hide()}>
            {user.id !== "" ? (
                <UserStack />
            ) : <AuthStack />}
        </NavigationContainer>
    )
}