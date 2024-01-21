import { View, StatusBar, Image, FlatList, ScrollView, Animated, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ButtonPrimary, ButtonWhite, HeaderComponent, SearchComponents } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import FontSize from '../../constants/FontSize'
import Spacing from '../../constants/Spacing'
import { kdrtImage, womanImage } from '../../assets'

import Font from '../../constants/Font'
import AppTextInput from '../../components/textinput/textinput.component'
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator'
import { AbuseType, ReportEntity } from '../../../domain'
import abuseTypes from '../../../domain/entities/abuse.entity'
import { reportsDatabaseRef } from '../../../application'
import auth from '@react-native-firebase/auth';
import ItemReportComponent from '../../components/card/item.report.component'
import { Card, Text } from 'react-native-paper'
import { AuthUserContext } from '../../../application/context/auth.context'


export default function HomeScreen({ navigation }: TabsStackScreenProps<"home">) {
    const { colors } = useTheme()
    const [reports, setReports] = useState<ReportEntity[]>([])
    const { user, setUser, logOut } = useContext(AuthUserContext)



    function EmpowerMentBody() {
        return (
            <View >
                <Text style={{ fontSize: FontSize.large, opacity: 0.75, fontWeight: '900', color: colors.text, marginBottom: Spacing * 2, }} numberOfLines={1}>
                    Empowerment 👋
                </Text>

                <View style={{
                    height: 200,
                    borderRadius: 10,
                    overflow: 'hidden',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    flexDirection: 'row',
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: colors.primary,
                    padding: Spacing * 2
                }}>
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: FontSize.xLarge, fontWeight: "600", color: colors.card, marginBottom: Spacing * 2 }}>
                                Empowering Women & Children
                            </Text>
                            <Text style={{ fontSize: FontSize.medium, color: colors.card, marginBottom: Spacing * 2 }}>
                                Shaping Futures, Creating Equality!
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ButtonWhite title="Get Started" onPress={() => navigation.navigate('step1')}
                            />
                        </View>
                    </View>
                    <Image
                        source={womanImage} // Replace with your image URL
                        style={{ width: 200, height: 200, alignSelf: 'auto', marginRight: -50 }}
                        resizeMode="cover"
                    />
                </View>
            </View>
        )
    }

    useEffect(() => {
        getReports()
    }, [])

    async function getReports() {
        setReports([])
        reportsDatabaseRef
            .on('value', snapshot => {
                // console.log('Reports data: ', snapshot.val());
                setReports([])
                if (snapshot.exists()) {
                    const dataFromFirebase: ReportEntity[] = Object.values(snapshot.val() || {});
                    setReports(dataFromFirebase)
                }
            })
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle='dark-content'
            />
            <ScrollView showsVerticalScrollIndicator={false}

            >
                <View style={{ padding: Spacing }}>

                    <HeaderComponent title={`Hi, ${user.nama}`} subTitle='Software Engineer' navigation={navigation} />
                    <SearchComponents />
                    <View style={{ height: Spacing * 2 }} />
                    <EmpowerMentBody />
                    <Text style={{ fontSize: FontSize.large, opacity: 0.75, fontWeight: '900', color: colors.text, marginVertical: Spacing * 2, }} numberOfLines={1}>
                        Latest History
                    </Text>

                    {
                        reports.map((item, index) => {
                            return (
                                <ItemReportComponent key={item.id} item={item} navigation={navigation} />
                                // <TouchableOpacity key={item.id} onPress={() => navigation.navigate('detail', { item: item })}>
                                // </TouchableOpacity>
                            )
                        })
                    }

                    {/* {
                        abuseTypes.map((item) => {
                            return (
                                <HistoryBody key={item.id} id={item.id} title={item.title} description={item.description} />
                            )
                        })
                    } */}
                </View>
            </ScrollView>





        </SafeAreaView>
    )
}

