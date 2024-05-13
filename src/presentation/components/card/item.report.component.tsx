import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ReportEntity } from '../../../domain'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import { CustomDefaultTheme } from '../../themes/AppThemes'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import { kdrtImage } from '../../assets'
import { Card, Divider } from 'react-native-paper'
import ItemScheduleComponent from './item.schedule.component'
interface props {
    item: ReportEntity,
    navigation: any
}
export default function ItemReportComponent({ item, navigation }: props) {

    function Detail({ title, desc }: { title: string, desc: string }) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: Spacing }}>
                <Text style={{ fontSize: FontSize.medium, fontWeight: '900' }}>{title}</Text>
                <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.small }}>{desc}</Text>
            </View>
        )
    }
    return (
        <Card style={{ marginBottom: Spacing * 2, backgroundColor: 'white' }} onPress={() => navigation.navigate('detail', { item: item })}>
            <Card.Content>
                <View style={styles.container}>
                    <Image source={{ uri: item.s3_bukti }} style={{ flex: 1, height: 180, borderRadius: Spacing * 2 }} />
                    <View style={{ flex: 2, padding: Spacing }}>
                        <View style={styles.containerHeader}>
                            <Text style={{ fontSize: FontSize.small, fontWeight: '600' }} numberOfLines={2}>
                                {item.s4_tanggal}
                            </Text>
                            <Text style={{ fontSize: FontSize.small, }} numberOfLines={2}>
                                {item.s4_telp}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>

                            <Text style={styles.textTitle} numberOfLines={2}>
                                {item.s3_jenis}
                            </Text>
                            <Text style={styles.textDesc} numberOfLines={3}>
                                {item.s5_alasan}
                            </Text>

                        </View>
                        <Divider style={{ margin: Spacing }} />
                        <View style={{ flexDirection: 'row', marginBottom: Spacing }}>
                            <Text style={styles.textJenis} numberOfLines={1}>
                                {item.s3_jenis}
                            </Text>
                            <Text style={[styles.textStatus, { backgroundColor: item.status === "Diproses" ? "aqua" : item.status === "Ditolak" ? "red" : item.status === "Diproses" ? "aqua" : "green" }]} numberOfLines={1}>
                                {item.status}
                            </Text>
                        </View>
                        {item.status === "Diterima" ? <ItemScheduleComponent reportId={item.id.toString()} /> : <></>}
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

    },
    containerHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    textTitle: { fontSize: FontSize.large, fontWeight: 'bold', color: CustomDefaultTheme.colors.text, marginBottom: Spacing },
    textDesc: { fontSize: FontSize.medium, fontFamily: Font['poppins-regular'] },
    textJenis: { marginRight: Spacing, color: 'white', fontSize: FontSize.small, fontWeight: '600', backgroundColor: CustomDefaultTheme.colors.primary, paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing * 2 },
    textStatus: { color: 'white', fontSize: FontSize.small, fontWeight: '600', paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing * 2 }
})