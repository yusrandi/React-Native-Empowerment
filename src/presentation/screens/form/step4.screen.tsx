import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../constants/Spacing'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ProgressBar, TextInput } from 'react-native-paper';
import { CustomDefaultTheme } from '../../themes/AppThemes';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { WizardStore } from '../../../application/store/store';
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator';
import { RootStackParamList } from '../../../application/navigations/root.navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Step4Screen({ navigation }: NativeStackScreenProps<RootStackParamList, "step4">) {
    const { colors } = useTheme()
    const currentDate: Date = new Date()
    const [jk, setJk] = useState<string>("Laki")


    function Header() {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2, paddingHorizontal: Spacing * 2 }}>
                <TouchableOpacity
                    // onPress={() => logOut()}
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
                        Form Pengaduan
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        Step 4/5
                    </Text>
                </View>
            </View>
        )
    }
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: WizardStore.useState((s) => s) });
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused &&
            WizardStore.update((s) => {
                s.progress = 0.8;
                s.s4_tanggal = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

            });

    }, [isFocused]);


    const onSubmit = (data: any) => {
        WizardStore.update((s) => {
            s.progress = 1;
            s.s4_nik = data.s4_nik;
            s.s4_nama = data.s4_nama;
            s.s4_jk = jk;
            s.s4_usia = data.s4_usia;
            s.s4_ortu = data.s4_ortu;
            s.s4_telp = data.s4_telp;
            s.s4_kota = data.s4_kota;
            s.s4_alamat = data.s4_alamat;
        });
        navigation.navigate("step5");
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ProgressBar
                style={{}}
                progress={WizardStore.getRawState().progress}
                color={colors.primary}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, margin: Spacing * 2 }}>
                <View style={{ paddingHorizontal: 16 }}>

                    <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                        LAPORAN PENGADUAN / PELAYANAN
                    </Text>

                    <View style={[styles.formEntry]}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    mode="outlined"
                                    label="NIK"
                                    placeholder="NIK"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="numeric"
                                />
                            )}
                            name="s4_nik"
                        />
                        {errors.s4_nik && (
                            <Text style={{ color: "red" }}>
                                This is a required field.
                            </Text>
                        )}
                    </View>

                    <View style={styles.formEntry}>
                        <Controller
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    mode="outlined"
                                    label="Hari/Tanggal"
                                    placeholder="Hari/Tanggal"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    readOnly
                                    value={WizardStore.getRawState().s4_tanggal}
                                />
                            )}
                            name="s4_tanggal"
                        />
                        {errors.s4_tanggal && (
                            <Text style={{ color: "red" }}>
                                This is a required field.
                            </Text>
                        )}
                    </View>


                    <View style={{ marginVertical: Spacing * 2, gap: Spacing }}>
                        <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                            IDENTITAS PELAPOR
                        </Text>

                        <View style={styles.formEntry}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Nama Lengkap"
                                        placeholder="Nama Lengkap"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="s4_nama"
                            />
                            {errors.s4_nama && (
                                <Text style={{ color: "red" }}>
                                    This is a required field.
                                </Text>
                            )}
                        </View>
                        <View style={[styles.formEntry, { gap: Spacing, marginVertical: Spacing * 2 }]}>
                            <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                                Jenis Kelamin
                            </Text>
                            <View style={{ flexDirection: 'row', gap: Spacing * 2 }}>
                                <TouchableOpacity onPress={() => setJk("Laki")}>
                                    <FontAwesome name='male' size={Spacing * 5} color={jk === "Laki" ? colors.primary : colors.text} style={{}} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setJk("Perempuan")}>
                                    <FontAwesome name='female' size={Spacing * 5} color={jk !== "Laki" ? colors.primary : colors.text} style={{}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.formEntry}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Usia"
                                        placeholder="Usia"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType='numeric'
                                    />
                                )}
                                name="s4_usia"
                            />
                            {errors.s4_usia && (
                                <Text style={{ color: "red" }}>
                                    This is a required field.
                                </Text>
                            )}
                        </View>

                        <View style={[styles.formEntry]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="No Telp"
                                        placeholder="08xxxxx"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType='numeric'
                                    />
                                )}
                                name="s4_telp"
                            />
                            {errors.s4_telp && (
                                <Text style={{ color: "red" }}>
                                    This is a required field.
                                </Text>
                            )}
                        </View>

                        <View style={[styles.formEntry]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Nama Orang Tua"
                                        placeholder="Nama Orang Tua"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="s4_ortu"
                            />
                            {errors.s4_ortu && (
                                <Text style={{ color: "red" }}>
                                    This is a required field.
                                </Text>
                            )}
                        </View>
                        <View style={[styles.formEntry]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Kota/Prov"
                                        placeholder="Kota/Prov"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="s4_kota"
                            />
                            {errors.s4_kota && (
                                <Text style={{ color: "red" }}>
                                    This is a required field.
                                </Text>
                            )}
                        </View>
                        <View style={[styles.formEntry]}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Alamat"
                                        placeholder="Alamat"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        multiline={true}
                                        numberOfLines={4}
                                        value={value}
                                    />
                                )}
                                name="s4_alamat"
                            />
                            {errors.s4_alamat && (
                                <Text style={{ color: "red" }}>
                                    This is a required field.
                                </Text>
                            )}
                        </View>
                    </View>


                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonPrevious} onPress={() => navigation.goBack()} >
                            <AntDesign name='arrowleft' size={24} color={colors.primary} />
                            <Text style={[{ marginRight: Spacing, color: colors.primary, textAlign: 'center', fontSize: FontSize.large, fontFamily: Font['poppins-regular'] }]}>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNext} onPress={handleSubmit(onSubmit)} >
                            <Text style={[{ marginRight: Spacing, color: colors.card, textAlign: 'center', fontSize: FontSize.large, fontFamily: Font['poppins-regular'] }]}>Next</Text>
                            <AntDesign name='arrowright' size={24} color={colors.card} />
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: Spacing * 2,
        flexDirection: 'row',
        gap: Spacing * 2
    },
    buttonPrevious: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        height: 50,
        borderWidth: 0.5,
        borderColor: 'grey',
        gap: Spacing,
        justifyContent: 'center'
    },
    buttonNext: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: CustomDefaultTheme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        height: 50,
        borderWidth: 0.5,
        borderColor: 'grey',
        gap: Spacing,
        justifyContent: 'center'
    },
    formEntry: {
    },
})