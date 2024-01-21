import { Dispatch, SetStateAction, createContext, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { UserEntity, emptUser } from '../../domain/entities/user.entity';
import { usersDatabaseRef } from '../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface props {
    children: JSX.Element
}
export type AuthContextProps = {
    isLoading: boolean
    isLoggedIn: boolean
    user: UserEntity,
    setUser: Dispatch<SetStateAction<UserEntity>>,
    login: (email: string, password: string) => void
    register: (user: UserEntity, password: string) => void
    logOut: () => void
}

export const AuthUserContext = createContext({} as AuthContextProps)

export default function AuthProvider({ children }: props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<UserEntity>(emptUser)

    async function login(email: string, password: string) {
        setIsLoading(true)
        await auth().signInWithEmailAndPassword(email, password)
            .then(async userCredential => {
                // console.log({ userCredential });
                const userId = userCredential.user.uid
                console.log({ userId });
                setIsLoggedIn(true)
                usersDatabaseRef.child(userId).update({
                    token: await AsyncStorage.getItem("fcmtoken")!
                })
                    .then(() => console.log("User added"))
                    .catch((error) => {
                        console.log(error.message);
                        console.log(error)
                    })

                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error.message);
                Alert.alert(error.message)
            })

    }

    async function register(user: UserEntity, password: string) {

        setIsLoading(true)
        await auth().createUserWithEmailAndPassword(user.email, password)
            .then(async userCredential => {
                // console.log({ userCredential });
                const userId = userCredential.user.uid
                console.log({ userId });

                usersDatabaseRef.child(userId).set({
                    id: userId,
                    email: userCredential.user.email,
                    nama: user.nama,
                    role: "USER",
                    token: await AsyncStorage.getItem("fcmtoken")!

                })
                    .then(() => console.log("User added"))
                    .catch((error) => {
                        console.log(error.message);
                        console.log(error)
                    })

            })
            .catch(error => {
                console.log(error.message);
                Alert.alert(error.message)
            })
        setIsLoggedIn(true)
        setIsLoading(false)
    }

    async function logOut() {
        setIsLoading(true)
        const userId = auth().currentUser?.uid
        await auth().signOut()
        setIsLoading(false)
    }

    return (
        <AuthUserContext.Provider value={{ isLoading: isLoading, user: user, setUser: setUser, isLoggedIn: isLoggedIn, login: login, register: register, logOut: logOut }}>
            {children}
        </AuthUserContext.Provider>

    )
}