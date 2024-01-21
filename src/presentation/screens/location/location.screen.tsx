import { View, Text, StyleSheet } from 'react-native'
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

export default function LocationScreen({ navigation }: TabsStackScreenProps<"location">) {
    const { colors } = useTheme()
    const [distance, setDistance] = useState<string>("")
    const [duration, setDuration] = useState<string>("")

    const origin: Coordinate = {
        location: {
            lat: -6.263230,
            lng: 106.652496
        },
        description: "Pondok Jagung, Serpong Utara, South Tangerang City, Banten 15326"
    }
    const destination: Coordinate = {
        location: {
            lat: -6.263507332423247,
            lng: 106.65090857166746
        },
        description: "Les belles maisons k15, RT.4/RW.1, Pd. Jagung, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15326"
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
                    console.log(data.rows[0].elements[0].distance)
                    //   dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                    setDistance(data.rows[0].elements[0].distance.text)
                    setDuration(data.rows[0].elements[0].duration.text)

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