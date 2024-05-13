import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Coordinate } from '../../../domain/entities/location.entity';
import { MAP_API_KEY } from '../../../application/utils/maps';
import MapViewDirections from 'react-native-maps-directions';
import { useTheme } from '@react-navigation/native';
import { Logo, pinHomeImage, pinImage } from '../../assets';
import Spacing from '../../constants/Spacing';
import { HeaderComponent, SearchComponents } from '../../components';
import FontSize from '../../constants/FontSize';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator';

import Geolocation from '@react-native-community/geolocation';

export default function LocationScreen({ navigation }: TabsStackScreenProps<"location">) {
    const { colors } = useTheme()
    const [distance, setDistance] = useState<string>("")
    const [duration, setDuration] = useState<string>("")
    const [origin, setOrigin] = useState<Coordinate>({

        location: {
            lat: -5.063476,
            lng: 119.526019
        },
        description: "You are here"
    })

    let watchID = ""

    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');

    useEffect(() => {
        const requestLocationPermission = async () => {

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();
                    subscribeLocationLocation();
                } else {
                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }

        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position: any) => {
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);

                setOrigin({
                    location: {
                        lat: Number(currentLatitude),
                        lng: Number(currentLongitude)
                    },
                    description: "You are here"
                })
            },
            (error: any) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position: any) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                setCurrentLatitude(currentLatitude);

                setOrigin({
                    location: {
                        lat: Number(currentLatitude),
                        lng: Number(currentLongitude)
                    },
                    description: "You are here"
                })
            },
            (error: any) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };


    const destination: Coordinate = {
        location: {
            lat: -4.951406,
            lng: 119.851400
        },
        description: "Dinas Pemberdayaan Perempuan dan Perlindungan Anak Kabupaten Maros"
    }



    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (!origin || !destination || !mapRef.current) return;

        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { top: 20, right: 20, bottom: 20, left: 20 }
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            const URL = fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
          units=imperial&origins=${origin.description}
          &destinations=${destination.description}&key=${MAP_API_KEY}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(`distance ${data}`);
                    if (data != undefined && data.rows?.[0]?.elements?.[0]) {
                        setDistance(data.rows[0].elements[0].distance?.text ?? 'Distance not available');
                        setDuration(data.rows[0].elements[0].duration?.text ?? 'Duration not available');
                    } else {
                        // Handle the case where data or its structure is undefined
                        // For instance, you might want to set default values or display an error message.
                        setDistance('Distance not available');
                        setDuration('Duration not available');
                    }

                })
                ;
        }

        getTravelTime();
    }, [origin, destination, MAP_API_KEY]);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                // mapType='mutedStandard'
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                }}
            >
                {
                    origin && destination && (
                        <MapViewDirections
                            origin={{
                                latitude: origin.location.lat,
                                longitude: origin.location.lng
                            }}
                            destination={{
                                latitude: destination.location.lat,
                                longitude: destination.location.lng
                            }}
                            apikey={MAP_API_KEY}
                            strokeWidth={3}
                            strokeColor={colors.primary}
                        />
                    )
                }

                {
                    origin?.location && (
                        <Marker
                            coordinate={{
                                latitude: origin.location.lat,
                                longitude: origin.location.lng,
                            }}
                            title="Origin"
                            description={origin.description}
                            identifier='origin'
                            image={pinImage} // Gunakan gambar sebagai pin marker
                            style={{ width: 30, height: 30 }} // Atur ukuran gambar (ganti dengan ukuran yang diinginkan)
                        />
                    )
                }

                {
                    destination?.location && (
                        <Marker
                            coordinate={{
                                latitude: destination.location.lat,
                                longitude: destination.location.lng,
                            }}
                            title="Destination"
                            description={destination.description}
                            identifier='destination'
                            image={pinHomeImage}
                            style={{ width: 20, height: 20 }}

                        />
                    )
                }
            </MapView>
            <View style={{ position: 'absolute', backgroundColor: 'transparent', borderRadius: 52, top: Spacing * 4, left: Spacing, right: Spacing }}>
                <HeaderComponent title={'Lokasi'} navigation={navigation} />
            </View>
            <View style={{ position: 'absolute', backgroundColor: colors.primary, height: 100, bottom: Spacing * 2, left: Spacing, right: Spacing, borderRadius: Spacing * 2, flexDirection: 'row', padding: Spacing, alignItems: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'column' }}>
                    {
                        locationStatus && (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="pin" size={18} color={colors.card} style={{ opacity: 0.5, marginRight: Spacing }} />
                                <Text style={{ fontSize: FontSize.large, fontWeight: '900', color: colors.card, }} numberOfLines={1}>
                                    {locationStatus}
                                </Text>
                            </View>
                        )
                    }
                    <View style={{ height: Spacing * 2 }} />
                    {
                        duration && (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="camera-timer" size={18} color={colors.card} style={{ opacity: 0.5, marginRight: Spacing }} />
                                <Text style={{ fontSize: FontSize.large, fontWeight: '900', color: colors.card, }} numberOfLines={1}>
                                    {duration}
                                </Text>
                            </View>
                        )
                    }
                    <View style={{ height: Spacing * 2 }} />
                    {
                        distance && (
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="run" size={18} color={colors.card} style={{ opacity: 0.5, marginRight: Spacing }} />

                                <Text style={{ fontSize: FontSize.large, fontWeight: '900', color: colors.card, }} numberOfLines={1}>
                                    {distance}
                                </Text>
                            </View>
                        )
                    }
                </View>
                <View style={{ backgroundColor: colors.card, padding: Spacing, alignItems: 'center', borderRadius: 52, height: 60, width: 60, justifyContent: 'center', alignSelf: 'center' }}>
                    <MaterialCommunityIcons name="go-kart" size={36} color={colors.primary} style={{}} />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
})