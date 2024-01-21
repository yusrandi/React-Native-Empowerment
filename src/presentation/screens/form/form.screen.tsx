import { ProgressBarAndroidBase, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontSize from '../../constants/FontSize'
import { ProgressBar } from 'react-native-paper'
import Font from '../../constants/Font'
import { CustomDefaultTheme } from '../../themes/AppThemes'
import Step1 from './step1'
import Step2 from './step2'
import { WizardStore } from '../../../application/store/store'
import { useForm } from 'react-hook-form'

export default function Formscreen() {
    const { colors } = useTheme()
    const [step, setStep] = useState<number>(1)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues: WizardStore.useState((s) => s) });

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
                        Step {step}/5
                    </Text>
                </View>
            </View>
        )
    }
    function prevStep() {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    }
    function nextStep() {
        if (step < 5) {
            setStep(prevStep => prevStep + 1);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ProgressBar
                style={{}}
                progress={step / 5}
                color={colors.primary}
            />
            <View style={{ flex: 1 }}>
                <Text>Hello hello</Text>
                {
                    step == 1 ? <Step1 control={control} errors={errors} /> : <Step2 />
                }
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPrevious} onPress={prevStep} >
                    <AntDesign name='arrowleft' size={24} color={colors.primary} />
                    <Text style={[{ marginRight: Spacing, color: colors.primary, textAlign: 'center', fontSize: FontSize.large, fontFamily: Font['poppins-regular'] }]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={handleSubmit(nextStep)} >
                    <Text style={[{ marginRight: Spacing, color: colors.card, textAlign: 'center', fontSize: FontSize.large, fontFamily: Font['poppins-regular'] }]}>Next</Text>
                    <AntDesign name='arrowright' size={24} color={colors.card} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
    },
    buttonContainer: {
        margin: Spacing * 2,
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
        height: 60,
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
        height: 60,
        borderWidth: 0.5,
        borderColor: 'grey',
        gap: Spacing,
        justifyContent: 'center'
    }

})