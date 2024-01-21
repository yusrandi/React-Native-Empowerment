import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import { bgWomanImage, womanImage } from '../../assets'
import { HeaderComponent } from '../../components'
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator'


export default function AboutScreen({ navigation }: TabsStackScreenProps<"about">) {
    const { colors } = useTheme()

    function TitleAbout({ titleText }: { titleText: string }) {
        return (
            <View>
                <Text style={{ fontSize: FontSize.large, opacity: 0.75, fontWeight: '900', color: colors.text }} numberOfLines={1}>
                    {titleText}
                </Text>
            </View>
        )
    }

    function CardAbout({ description }: { description: string }) {
        return (
            <View style={{
                height: 200,
                borderRadius: Spacing * 2,
                overflow: 'hidden',
                padding: Spacing * 2,
                flexDirection: 'row',
                marginTop: Spacing,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                backgroundColor: colors.primary,

            }}>
                <View style={{ flex: 2, padding: Spacing }}>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: FontSize.large, fontFamily: Font['poppins-regular'], marginRight: Spacing * Spacing, color: colors.card }}>
                            {description}
                        </Text>
                        <Image source={womanImage} style={{ position: 'absolute', bottom: -30, right: -100, height: 200, width: 200, resizeMode: 'contain' }} />
                    </View>

                </View>

            </View>

        )
    }

    function Line() {
        return (
            <View style={{
                width: '80%',
                borderBottomColor: colors.primary,
                borderBottomWidth: 1,
            }}>

            </View>
        )
    }

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <Image source={bgWomanImage} style={{ position: 'absolute', bottom: -50, left: 0, height: 300, width: 300, resizeMode: 'contain' }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: Spacing }}>
                    <HeaderComponent title={'Tentang'} navigation={navigation} />
                    <View style={{
                        alignItems: 'center', borderBottomColor: colors.primary,
                        borderBottomWidth: 1,
                    }}>
                        <TitleAbout titleText='PUSAT PELAYAN TERPADU' />
                        <TitleAbout titleText='PEMBERDAYAAN PEREMPUAN DAN ANAK' />
                        <TitleAbout titleText='P2TP2A' />
                    </View>

                    <CardAbout description={'\t\t\tKekerasan merupakan segala perbuatan yang menyebabkan timbulnya kesengsaraan ataupun penderitaan baik secara fisik, psikis, seksual ataupun tindakan penelantara begitupun tindakan ancaman yang memaksa untuk melakukan suatu perbuatan, segala pemaksaan ataupun perampasan kemerdekaan yang melawan hukum.'} />
                    <CardAbout description={'\t\t\tTindakan kekerasan ini merupakan suatu kejahatan yang kerap terjadi di Indonesia, termasuk kekerasan seksual. Suatu perbuatan pidana yang tidak lagi asing dan sering kali terjadi menjadi berita yang disiarkan dimedia. Kekerasan seksual yang mayoritas korbannya adalah perempuan dan anak kerap kali menjadi sorotan berita yang ditampilkan dimedia cetak maupun elektronik. Hal ini tentunya menjadi suatu perhatian bagi seluruh rakyat indonesia.'} />
                    <CardAbout description={'\t\t\tSalah satu lembaga yang melaksanakan fungsi pendampingan ini adalah lembaga Pusat Pelayanan Terpadu Pemberdayaan Perempuan dan Anak (P2TP2A) tepatnya diKabupaten maros provinsi sulawesi selatan  yang menjadi salah satu  lembaga yang mengalami kasus tersebut.  Lembaga ini juga melaksanakan fungsi pendampingan kepada korban kekerasan seksual khususnya perempuan dan anak sebagai suatu proses pemulihan terhadap korban.'} />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}