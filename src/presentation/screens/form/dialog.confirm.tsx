import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper'
import { WizardStore } from '../../../application/store/store';
import auth from '@react-native-firebase/auth';
import { reportsDatabaseRef } from '../../../application/utils/firebase';
import { RootStackParamList } from '../../../application/navigations/root.navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import storage from '@react-native-firebase/storage'
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    navigation: any;
}
export default function DialogConfirm({ visible, setVisible, navigation }: props) {

    const hideDialog = () => setVisible(false);
    const information = WizardStore.useState();
    const [loading, setLoading] = useState<boolean>(false)
    const { colors } = useTheme()



    async function submit() {
        console.log('Ok')
        const userId = auth().currentUser?.uid!;
        const currentTimeInMilliseconds = Date.now();
        console.log({ currentTimeInMilliseconds });

        console.log(`User ID ${userId}`);

        const imageName = information.s3_bukti.substring(information.s3_bukti.lastIndexOf('/') + 1)

        const reference = storage().ref(imageName)
        setLoading(true)
        try {

            const task = reference.putFile(information.s3_bukti);

            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            task.then(async (data) => {
                const url = await reference.getDownloadURL().catch((error) => { throw error });
                console.log('Image uploaded to the bucket! ', url);

                reportsDatabaseRef.child(currentTimeInMilliseconds.toString()).set({
                    id: currentTimeInMilliseconds,
                    user_id: userId,
                    s1_nama: information.s1_nama,
                    s1_jk: information.s1_jk,
                    s1_ttl: information.s1_ttl,
                    s1_agama: information.s1_agama,
                    s1_hubungan: information.s1_hubungan,
                    s1_telp: information.s1_telp,
                    s1_kec: information.s1_kec,
                    s1_kota: information.s1_kota,
                    s1_alamat: information.s1_alamat,
                    s2_nama: information.s2_nama,
                    s2_jk: information.s2_jk,
                    s2_ttl: information.s2_ttl,
                    s2_agama: information.s2_agama,
                    s2_hubungan: information.s2_hubungan,
                    s2_telp: information.s2_telp,
                    s2_kec: information.s2_kec,
                    s2_kota: information.s2_kota,
                    s2_alamat: information.s2_alamat,
                    s3_tanggal: information.s3_tanggal,
                    s3_tempat: information.s3_tempat,
                    s3_jenis: information.s3_jenis,
                    s3_bukti: url,
                    s4_nik: information.s4_nik,
                    s4_tanggal: information.s4_tanggal,
                    s4_nama: information.s4_nama,
                    s4_jk: information.s4_jk,
                    s4_usia: information.s4_usia,
                    s4_ortu: information.s4_ortu,
                    s4_telp: information.s4_telp,
                    s4_kota: information.s4_kota,
                    s4_alamat: information.s4_alamat,
                    s5_alasan: information.s5_alasan,
                    s5_catatan: information.s5_catatan,
                    status: "Diajukan",
                    token: await AsyncStorage.getItem("fcmtoken")!,

                })
                    .then(() => {
                        console.log("Report added")
                        setLoading(false)
                        navigation.navigate("tabs")
                    })
                    .catch((error) => {
                        console.log(error.message);
                        console.log(error)
                    })
            });

        } catch (error) {

        }




    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>

                <Dialog.Icon icon="alert" />
                <Dialog.Title style={styles.title}>Dialog Konfirmasi </Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">Mohon periksa kembali laporan anda, apakah anda yakin submit?</Text>
                    {
                        loading && (
                            <ActivityIndicator animating={true} size={'large'} color={colors.primary} />
                        )
                    }
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setVisible(false)}>Batal</Button>
                    <Button onPress={submit}>Submit</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
})