import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native';

import database from '@react-native-firebase/database';


export async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  }

  export async function getFCMToken() {
    
    const fcmToken = await AsyncStorage.getItem("fcmtoken")
    try {
        console.log(`Old Token ${fcmToken}`);

        if (fcmToken === null) {
            try {
                const token = await messaging().getToken()
                if (token) {
                    console.log(`new Token ${token}`);
                    await AsyncStorage.setItem("fcmtoken", token)
                    
                }
            } catch (error) {
                console.log(`Error while getting fcm token from asyncstorage ${error}`);
                
            }
        } else {
            
        }
    } catch (error) {
        console.log(`Error handling FCM Token ${error}`);
        
    }
    
  }

  export function notificationListener() {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    //   setLoading(false);
    });
    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // Membaca notifikasi dari pesan
        const notification = remoteMessage.notification;
        if (notification) {
            console.log('Notification Title:', notification.title);
            console.log('Notification Body:', notification.body);

        Alert.alert(notification.title!, notification.body);

            // Membaca properti android dari notifikasi (jika ada)
            const androidNotification = notification.android;
            if (androidNotification) {
                // Lakukan sesuatu dengan properti android, jika diperlukan
                console.log('Android Notification Properties:', androidNotification);
            }
        }

      });

      // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
  }


const usersDatabaseRef = database().ref('users');
const reportsDatabaseRef = database().ref('reports');
const schedulesDatabaseRef = database().ref('schedules');
export {usersDatabaseRef, reportsDatabaseRef, schedulesDatabaseRef}