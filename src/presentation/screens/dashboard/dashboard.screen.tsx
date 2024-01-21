import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useState } from 'react'
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Font from '../../constants/Font';
import { Logo } from '../../assets';
import storage from '@react-native-firebase/storage'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonPrimary from '../../components/button/primary.button.component';


export default function DashboardScreen() {
    const [pickedImage, setPickedImage] = useState<string | null>(null);


    async function handleOpenCamera() {

        try {
            const image: any = await ImagePicker.openPicker({
                width: 400,
                height: 200,
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


            const reference = storage().ref(imageName)
            try {

                const task = reference.putFile(image.path);

                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });

                task.then(async (data) => {
                    const url = await reference.getDownloadURL().catch((error) => { throw error });
                    console.log('Image uploaded to the bucket! ', url);
                });

            } catch (error) {

            }

        } catch (error) {
            // console.error('Image picker error:', error);
        }

    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16 }}>
            <Text style={styles.sectionTitle}>Dahsboard Respose</Text>
            <Image source={Logo} style={{ width: 112, height: 112 }} />
            <AntDesign name='home' size={42} />
            {pickedImage && <Image source={{ uri: pickedImage }} style={styles.image} />}
            <ButtonPrimary title="Press Me" onPress={handleOpenCamera} />
        </View>
    )
}
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: Font['juno']
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    imageContainer: {
        marginVertical: 24,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
    },

});