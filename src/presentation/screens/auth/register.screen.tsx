import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { bgWomanImage, newLogo } from '../../assets'
import FontSize from '../../constants/FontSize'
import Spacing from '../../constants/Spacing'
import { DividerText, TextInputAuth } from '../../components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../application/navigations/root.navigator'
import LinearGradient from 'react-native-linear-gradient'
import { AuthUserContext } from '../../../application/context/auth.context'
import { UserEntity } from '../../../domain/entities/user.entity'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RegisterScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "register">) {
    const { colors } = useTheme()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { register, isLoading } = useContext(AuthUserContext)

    async function handleRegister() {

        // console.log({ user });
        const user: UserEntity = {
            id: '',
            nama: name,
            email: email,
            role: 'USER',
            token: await AsyncStorage.getItem("fcmtoken")!
        }
        console.log({ user });
        console.log({ password });

        register(user, password)
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle='light-content'
            />
            <LinearGradient colors={['#E5B2CA', '#CD82DE']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={newLogo} style={{ height: 200, resizeMode: 'contain' }} />
                <Text style={{ fontSize: FontSize.large, opacity: 0.75, fontWeight: '900', color: colors.card, marginBottom: Spacing }} numberOfLines={1}>
                    Hi there!
                </Text>
                <Text style={{ fontSize: FontSize.xxLarge, fontWeight: '900', color: colors.card, }} numberOfLines={1}>
                    Let's Get Started.
                </Text>
                <View style={{ width: '80%', marginVertical: Spacing * 2 }}>
                    <TextInputAuth
                        icon='person-outline'
                        placeholder='Fullname'
                        value={name}
                        onChangeText={(text: any) => setName(text)} />

                    <View style={{ height: Spacing }} />
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
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={(text: any) => setPassword(text)} />

                </View>

                <View style={{ height: Spacing * 2 }} />

                <TouchableOpacity style={{ backgroundColor: '#78258B', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 52, width: '80%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={handleRegister}>
                    {
                        isLoading ?
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: FontSize.large }}>{'loading ...'}</Text>
                            :
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: FontSize.large }}>{'Create an Account'}</Text>
                    }
                </TouchableOpacity>

                <DividerText />

                <TouchableOpacity style={{ backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 52, width: '80%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('login')} >
                    <Text style={{ color: '#78258B', textAlign: 'center', fontSize: FontSize.large }}>{'Log In'}</Text>
                </TouchableOpacity>

            </LinearGradient>
        </SafeAreaView>
    )
}