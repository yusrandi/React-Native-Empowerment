import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { bgWomanImage, womanImage, newLogo } from '../../assets';
import FontSize from '../../constants/FontSize';
import Spacing from '../../constants/Spacing';

import Icon from 'react-native-vector-icons/FontAwesome';
import { DividerText, TextInputAuth } from '../../components';
import AppTextInput from '../../components/textinput/textinput.component';
import { RootStackParamList } from '../../../application/navigations/root.navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { AuthUserContext } from '../../../application/context/auth.context';
import { TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "login">) {
    const { colors } = useTheme()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [hidePass, setHidePass] = useState(true);

    const { isLoading, login } = useContext(AuthUserContext)

    async function handleLogin() {
        console.log({ email });

        if (email !== "" && password !== "") {
            login(email, password)
        } else {
            Alert.alert("Harap mengisi semua kolom")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle='light-content'
            />
            <LinearGradient colors={['#A094E3', '#9183DE']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={newLogo} style={{ height: 200, resizeMode: 'contain' }} />
                <Text style={{ fontSize: FontSize.large, opacity: 0.75, fontWeight: '900', color: colors.card, marginBottom: Spacing }} numberOfLines={1}>
                    Welcome Back
                </Text>
                <Text style={{ fontSize: FontSize.xxLarge, fontWeight: '900', color: colors.card, }} numberOfLines={1}>
                    Please, Log In.
                </Text>
                <View style={{ width: '80%', marginVertical: Spacing * 2 }}>
                    <TextInputAuth
                        icon='alternate-email'
                        placeholder='Email'
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text: any) => setEmail(text)} />

                    <View style={{ height: Spacing }} />
                    <TextInputAuth
                        icon='lock-outline'
                        placeholder='Password'
                        value={password}
                        secureTextEntry={hidePass ? true : false}
                        autoCapitalize="none"
                        onChangeText={(text: any) => setPassword(text)} />

                </View>

                <View style={{ height: Spacing * 2 }} />

                <TouchableOpacity onPress={() => handleLogin()} style={{ backgroundColor: '#52439A', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 52, width: '80%', height: 50, alignItems: 'center', justifyContent: 'center' }} >
                    {
                        isLoading ?
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: FontSize.large }}>{'loading ...'}</Text>
                            :
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: FontSize.large }}>{'Continue'}</Text>
                    }
                </TouchableOpacity>

                <DividerText />

                <TouchableOpacity onPress={() => navigation.navigate('register')} style={{
                    backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 52, width: '80%', height: 50, alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    shadowColor: 'white',
                    shadowOffset: { width: 0, height: 2 },
                    flexDirection: 'row',
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,


                }} >
                    <Text style={{ color: colors.primary, textAlign: 'center', fontSize: FontSize.large }}>{'Create an Account'}</Text>
                </TouchableOpacity>


            </LinearGradient>
        </SafeAreaView>
    )
}

