import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../constants/Spacing'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, List, ProgressBar, Switch, TextInput } from 'react-native-paper';
import { CustomDefaultTheme } from '../../themes/AppThemes';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { WizardStore } from '../../../application/store/store';
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator';
import { RootStackParamList } from '../../../application/navigations/root.navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';


export default function Step1Screen({ navigation }: NativeStackScreenProps<RootStackParamList, "step1">) {
    const { colors } = useTheme()
    const [jk, setJk] = useState<string>("Perempuan")
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)


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
                        Form Pengaduan
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        Step 1/5
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
                s.progress = 0.2;
            });

    }, [isFocused]);


    const onSubmit = (data: any) => {
        WizardStore.update((s) => {
            s.progress = 0.4;
            s.s1_nama = data.s1_nama;
            s.s1_jk = jk;
            s.s1_ttl = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            s.s1_agama = data.s1_agama;
            s.s1_hubungan = data.s1_hubungan;
            s.s1_telp = data.s1_telp;
            s.s1_kec = data.s1_kec;
            s.s1_kota = data.s1_kota;
            s.s1_alamat = data.s1_alamat;
        });
        navigation.navigate("step2");
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
                        IDENTITAS KORBAN
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
                                    label="Full Name"
                                    placeholder="Enter Full Name"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="s1_nama"
                        />
                        {errors.s1_nama && (
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

                    <View style={[styles.formEntry, { gap: Spacing, marginVertical: Spacing * 2 }]}>
                        <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                            Tanggal Lahir
                        </Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <View style={{
                                height: 50,
                                borderRadius: Spacing,
                                borderColor: colors.text,
                                borderWidth: 1,
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: Spacing * 2,
                                paddingHorizontal: Spacing,
                                backgroundColor: 'white'
                            }}>

                                <AntDesign name='calendar' size={24} color={colors.primary} style={{}} />

                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    mode='date'
                                    locale='id_ID'
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />

                                <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'], flex: 1 }} numberOfLines={1}>
                                    {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                                </Text>

                            </View>
                        </TouchableOpacity>

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
                                    label="Agama"
                                    placeholder="Agama anda"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="s1_agama"
                        />
                        {errors.s1_agama && (
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
                                    label="Hubungan dengan terlapor"
                                    placeholder="Hubungan dengan terlapor"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="s1_hubungan"
                        />
                        {errors.s1_hubungan && (
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
                            name="s1_telp"
                        />
                        {errors.s1_telp && (
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
                                    label="Kec / Kel"
                                    placeholder="Kec / Kel"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="s1_kec"
                        />
                        {errors.s1_kec && (
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
                            name="s1_kota"
                        />
                        {errors.s1_kota && (
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
                            name="s1_alamat"
                        />
                        {errors.s1_alamat && (
                            <Text style={{ color: "red" }}>
                                This is a required field.
                            </Text>
                        )}
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