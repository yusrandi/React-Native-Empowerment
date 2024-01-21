import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Spacing from '../../constants/Spacing';
import { useTheme } from '@react-navigation/native';
import FontSize from '../../constants/FontSize';
import { AuthUserContext } from '../../../application/context/auth.context';
import auth from '@react-native-firebase/auth'


interface props {
    title: string,
    subTitle?: string,
    navigation: any
}
export default function HeaderComponent({ title, subTitle, navigation }: props) {
    const { colors } = useTheme()
    const { user, setUser, logOut } = useContext(AuthUserContext)
    const AVATAR_URL = "https://img.freepik.com/free-vector/leadership-concept-illustration_114360-10880.jpg?w=1480&t=st=1703967991~exp=1703968591~hmac=50c827401c175cb915cc346f8af18c27f04de68d36f61236d23e28102482c729";

    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2 }}>
            <View style={{ backgroundColor: colors.primary, padding: 2, borderRadius: 52 }}>
                <Image source={{ uri: AVATAR_URL, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
            </View>

            <View style={[{ flex: 1, marginLeft: Spacing * 2, alignItems: 'center' }]}>
                <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }} numberOfLines={1}>
                    {title}
                    {/* 👋 */}
                </Text>
                {
                    subTitle && (
                        <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                            {subTitle}
                        </Text>
                    )
                }
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('profile')}
                style={{
                    width: 52,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 52,
                    borderWidth: 1,
                    borderColor: colors.primary,
                }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <AntDesign name="setting" size={32} color={colors.text} style={{ position: 'relative' }} />
                </View>

            </TouchableOpacity>
            {/* <Image source={require('../assets/images/pola.png')} resizeMode='center' style={{ width: 50, height: 50 }} /> */}
        </View >
    )
}