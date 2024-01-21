import React, { useContext } from 'react'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Spacing from '../../constants/Spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../application/navigations/root.navigator';
import { AuthUserContext } from '../../../application/context/auth.context';
import Font from '../../constants/Font';
import { TextInput } from 'react-native-paper';
import { CustomDefaultTheme } from '../../themes/AppThemes';
import FontSize from '../../constants/FontSize';
import auth from '@react-native-firebase/auth'



export default function ProfileScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "profile">) {
    const { colors } = useTheme()
    const { user, setUser, logOut } = useContext(AuthUserContext)



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
                        Profile
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        {user.email}
                    </Text>
                </View>
            </View>
        )
    }
    function Space({ height }: { height: number }) {
        return (
            <View style={{ height: height }} />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 18, color: colors.text, fontFamily: Font['poppins-regular'], marginBottom: Spacing * 2 }} numberOfLines={1}>
                    USER PROFILE
                </Text>
                <TextInput
                    mode="outlined"
                    label="ID"
                    placeholder="User ID"
                    value={user.id}
                    readOnly
                />
                <Space height={Spacing} />
                <TextInput
                    mode="outlined"
                    label="Full Name"
                    placeholder="Enter Full Name"
                    value={user.nama}
                    readOnly
                />
                <Space height={Spacing} />
                <TextInput
                    mode="outlined"
                    label="Email address"
                    placeholder="Enter email address"
                    value={user.email}
                    readOnly
                />

                <TouchableOpacity onPress={async () => await auth().signOut()} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: 50, justifyContent: 'center', backgroundColor: colors.primary, borderRadius: Spacing, marginVertical: Spacing * 2 }}>
                    <Text style={[{ marginRight: Spacing, color: colors.card, textAlign: 'center', fontSize: FontSize.large, fontFamily: Font['poppins-regular'] }]}>LOGOUT</Text>
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
    subContainer: {
        padding: Spacing * 2
    },
    buttonContainer: {
        marginVertical: Spacing * 2
    },

})