import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
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
import DialogConfirm from './dialog.confirm';


export default function Step5Screen({ navigation }: NativeStackScreenProps<RootStackParamList, "step5">) {
    const { colors } = useTheme()
    const [visible, setVisible] = React.useState(false);



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
                        Step 5/5
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
                s.progress = 1;
            });

    }, [isFocused]);


    const onSubmit = (data: any) => {
        WizardStore.update((s) => {
            s.progress = 1;
            s.s5_alasan = data.s5_alasan;
            s.s5_catatan = data.s5_catatan;
        });
        // navigation.navigate("Step2");
        setVisible(true)
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ProgressBar
                style={{}}
                progress={WizardStore.getRawState().progress}
                color={colors.primary}
            />
            <View style={{ flex: 1, margin: Spacing * 2, gap: Spacing }}>
                <View style={{ paddingHorizontal: 16, gap: Spacing }}>

                    <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                        DASAR PERMOHONAN / ALASAN
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
                                    label="Dasar Permohonan (Alasan)"
                                    placeholder="Dasar Permohonan (Alasan)"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={value}
                                />
                            )}
                            name="s5_alasan"
                        />
                        {errors.s5_alasan && (
                            <Text style={{ color: "red" }}>
                                This is a required field.
                            </Text>
                        )}
                    </View>
                    <Text style={{ marginTop: Spacing, fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                        CATATAN
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
                                    label="Catatan"
                                    placeholder="Catatan"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={value}
                                />
                            )}
                            name="s5_catatan"
                        />
                        {errors.s5_catatan && (
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
                    <DialogConfirm visible={visible} setVisible={setVisible} navigation={navigation} />
                </View>
            </View>

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