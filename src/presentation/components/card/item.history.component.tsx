import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import { kdrt2Image, kdrtImage } from '../../assets'

interface props {
    title: string,
    description: string
}
export default function ItemHistoryComponent({ title, description }: props) {
    const { colors } = useTheme()

    return (
        <View style={{
            height: 220,
            borderRadius: Spacing * 2,
            overflow: 'hidden',
            backgroundColor: colors.card,
            padding: Spacing * 2,
            flexDirection: 'row',
            // shadowColor: 'black',
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.3,
            // shadowRadius: 4,
            // elevation: 5,
            marginBottom: Spacing * 2,
            gap: Spacing,
            alignItems: 'center'
        }}>
            <View style={{ flex: 2, padding: Spacing, gap: Spacing }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: FontSize.small, fontWeight: '600' }} numberOfLines={2}>
                        Today, 14:04 PM
                    </Text>
                    <Text style={{ fontSize: FontSize.small, }} numberOfLines={2}>
                        54 min read
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: FontSize.xLarge, fontWeight: 'bold', color: colors.text, marginBottom: Spacing }} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={{ fontSize: FontSize.medium, fontFamily: Font['poppins-regular'] }} numberOfLines={3}>
                        {description}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginRight: Spacing, color: 'white', fontSize: FontSize.small, fontWeight: '600', backgroundColor: colors.primary, paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing * 2 }} numberOfLines={2}>
                        Kekerasan
                    </Text>
                    <Text style={{ color: 'white', fontSize: FontSize.small, fontWeight: '600', backgroundColor: 'green', paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing * 2 }} numberOfLines={2}>
                        konfirmasi
                    </Text>

                </View>

            </View>
            <Image source={kdrt2Image} style={{ flex: 1, height: 130, width: 130, borderRadius: Spacing * 2 }} />
        </View>
    )
}

const styles = StyleSheet.create({})