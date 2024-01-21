import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../../../application/navigations/root.navigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Divider, Text } from 'react-native-paper'
import FontSize from '../../constants/FontSize'


export default function DetailScreen({ navigation, route: { params: { item } }, }: NativeStackScreenProps<RootStackParamList, "detail">) {

    const { colors } = useTheme()


    function Header() {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2, paddingHorizontal: Spacing * 2 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        marginRight: Spacing * 2
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="arrowleft" size={32} color={colors.text} style={{ position: 'relative' }} />
                    </View>

                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text, }} numberOfLines={1}>
                        Detail Laporan
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                            {item.id}
                        </Text>
                        <Text style={styles.textStatus} numberOfLines={1}>
                            {item.status}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function Space({ height }: { height: number }) {
        return <View style={{ height: height }} />
    }
    function Body({ title, desc }: { title: string, desc: string }) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="titleMedium" style={{ flex: 1 }}>{title}</Text>
                <Text variant="titleMedium" style={{ flex: 1 }}>{desc}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header />
                <View style={{ padding: Spacing * 2 }}>
                    <Text variant="titleLarge">Detail Korban</Text>
                    <Space height={Spacing} />
                    <Card style={{ backgroundColor: 'white' }}>
                        <Card.Content>
                            <Text variant="titleMedium">Nama Korban</Text>
                            <Text variant="bodySmall">{item.s1_nama}</Text>

                            <Space height={Spacing} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text variant="titleMedium" style={{ flex: 1 }}>Jenis Kelamin</Text>
                                <Text variant="titleMedium" style={{ flex: 1 }}>{item.s1_jk}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text variant="titleMedium" style={{ flex: 1 }}>Tanggal Lahir</Text>
                                <Text variant="titleMedium" style={{ flex: 1 }}>{item.s1_ttl}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text variant="titleMedium" style={{ flex: 1 }}>Agama</Text>
                                <Text variant="titleMedium" style={{ flex: 1 }}>{item.s1_agama}</Text>
                            </View>
                            <Body title={"Telp"} desc={item.s1_telp} />
                            <Body title={"Kec/Kel"} desc={item.s1_kec} />
                            <Body title={"Kota/Kab"} desc={item.s1_kota} />

                            <Space height={Spacing} />

                            <Text variant="titleMedium">Hubungan dengan Terlapor</Text>
                            <Text variant="bodySmall">{item.s1_hubungan}</Text>
                            <Text variant="titleMedium">Alamat Korban</Text>
                            <Text variant="bodySmall">{item.s1_alamat}</Text>
                        </Card.Content>
                    </Card>
                    <Space height={Spacing * 2} />
                    <Divider />
                    <Space height={Spacing * 2} />
                    <Text variant="titleLarge">Detail Terlapor</Text>
                    <Space height={Spacing} />
                    <Card style={{ backgroundColor: 'white' }}>
                        <Card.Content>
                            <Text variant="titleMedium">Nama </Text>
                            <Text variant="bodySmall">{item.s1_nama}</Text>

                            <Space height={Spacing} />

                            <Body title={"Jenis Kelamin"} desc={item.s2_jk} />
                            <Body title={"Tanggal Lahir"} desc={item.s2_ttl} />
                            <Body title={"Agama"} desc={item.s2_agama} />
                            <Body title={"Telp"} desc={item.s2_telp} />
                            <Body title={"Kecamatan"} desc={item.s2_kec} />
                            <Body title={"Kota"} desc={item.s2_kota} />

                            <Space height={Spacing} />

                            <Text variant="titleMedium">Hubungan dengan Korban </Text>
                            <Text variant="bodySmall">{item.s2_hubungan}</Text>
                            <Text variant="titleMedium">Alamat </Text>
                            <Text variant="bodySmall">{item.s2_alamat}</Text>
                        </Card.Content>
                    </Card>
                    <Space height={Spacing * 2} />
                    <Divider />
                    <Space height={Spacing * 2} />
                    <Text variant="titleLarge">Detail Kejadian</Text>
                    <Space height={Spacing} />
                    <Card style={{ backgroundColor: 'white' }}>
                        <Card.Content>
                            <Text variant="titleMedium">Tanggal kejadian</Text>
                            <Text variant="bodySmall">{item.s3_tanggal}</Text>

                            <Space height={Spacing} />

                            <Body title={"Tempat Kejadia"} desc={item.s3_tempat} />
                            <Body title={"Jenis Kekerasan"} desc={`${item.s3_jenis}`} />
                            <Space height={Spacing} />
                            <Text variant="titleMedium">Dasar Permohonan (alasan)</Text>
                            <Text variant="bodySmall">{item.s5_alasan}</Text>
                            <Text variant="titleMedium">Catatan</Text>
                            <Text variant="bodySmall">{item.s5_catatan}</Text>

                        </Card.Content>
                    </Card>
                    <Space height={Spacing * 2} />
                    <Divider />
                    <Space height={Spacing * 2} />
                    <Text variant="titleLarge">Detail Pelapor</Text>
                    <Space height={Spacing} />
                    <Card style={{ backgroundColor: 'white' }}>
                        <Card.Content>
                            <Text variant="titleMedium">Tanggal</Text>
                            <Text variant="bodySmall">{item.s4_tanggal}</Text>

                            <Space height={Spacing} />

                            <Body title={"NIK"} desc={item.s4_nik} />
                            <Body title={"Nama"} desc={item.s4_nama} />
                            <Body title={"Jenis Kelamin"} desc={item.s4_jk} />
                            <Body title={"Usia"} desc={`${item.s4_usia} thn`} />
                            <Body title={"Orang tua"} desc={item.s4_ortu} />
                            <Body title={"Telp"} desc={item.s4_telp} />
                            <Body title={"Kota"} desc={item.s4_kota} />

                            <Space height={Spacing} />

                            <Text variant="titleMedium">Alamat Korban</Text>
                            <Text variant="bodySmall">{item.s4_alamat}</Text>
                        </Card.Content>
                    </Card>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textStatus: { color: 'white', fontSize: FontSize.small, fontWeight: '600', backgroundColor: 'green', paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing * 2 }

})