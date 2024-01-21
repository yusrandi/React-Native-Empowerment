import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';



export default function Step3Screen({ navigation }: NativeStackScreenProps<RootStackParamList, "step3">) {
    const { colors } = useTheme()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [pickedImage, setPickedImage] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string>("Silahkan pilih gambar bukti");


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
                        Step 3/5
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
                s.progress = 0.6;

            });

    }, [isFocused]);


    const onSubmit = (data: any) => {
        WizardStore.update((s) => {
            s.progress = 0.8;
            s.s3_tempat = data.s3_tempat;
            s.s3_jenis = data.s3_jenis;
            s.s3_tanggal = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            s.s3_bukti = pickedImage!

        });
        navigation.navigate("step4");
    };

    async function handleOpenCamera() {

        try {
            const image: any = await ImagePicker.openPicker({
                width: 250,
                height: 400,
                cropping: true,
            });

            if (!image) {
                // If the user cancels image selection or doesn't pick any image
                return;
            }

            console.log({ image });
            setPickedImage(image.path); // Store the path of the picked image
            const imageName = image.path.substring(image.path.lastIndexOf('/') + 1)
            console.log({ imageName });
            setImageName(imageName)


            // const reference = storage().ref(imageName)
            // try {

            //     const task = reference.putFile(image.path);

            //     task.on('state_changed', taskSnapshot => {
            //         console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            //     });

            //     task.then(() => {
            //         console.log('Image uploaded to the bucket!');
            //     });

            // } catch (error) {

            // }

        } catch (error) {
            // console.error('Image picker error:', error);
        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ProgressBar
                style={{}}
                progress={WizardStore.getRawState().progress}
                color={colors.primary}
            />
            <View style={{ flex: 1, margin: Spacing * 2 }}>
                <View style={{ paddingHorizontal: 16 }}>

                    <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                        KASUS KLIEN
                    </Text>

                    <View style={[styles.formEntry, { gap: Spacing, marginVertical: Spacing * 2 }]}>
                        <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                            Tanggal Kejadian
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

                    <View style={styles.formEntry}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    mode="outlined"
                                    label="Tempat Kejadian"
                                    placeholder="Tempat kejadian"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="s3_tempat"
                        />
                        {errors.s3_tempat && (
                            <Text style={{ color: "red" }}>
                                This is a required field.
                            </Text>
                        )}
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
                                    label="Jenis Kekerasan"
                                    placeholder="Jenis Kekerasan"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="s3_jenis"
                        />
                        {errors.s3_jenis && (
                            <Text style={{ color: "red" }}>
                                This is a required field.
                            </Text>
                        )}
                    </View>

                    <View style={[styles.formEntry, { gap: Spacing, marginVertical: Spacing * 2 }]}>
                        <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                            Sertakan Bukti (.jpg/.png)
                        </Text>
                        <TouchableOpacity onPress={handleOpenCamera}>
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

                                <AntDesign name='camera' size={24} color={colors.primary} style={{}} />

                                <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'], flex: 1 }} numberOfLines={1}>
                                    {imageName}
                                </Text>

                            </View>
                        </TouchableOpacity>

                        {pickedImage && <Image source={{ uri: pickedImage }} style={styles.image} />}



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
    image: {
        width: 100,
        height: 200,
    },
})