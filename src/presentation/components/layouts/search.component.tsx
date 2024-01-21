import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontSize from '../../constants/FontSize';

export default function SearchComponent() {

    const { colors } = useTheme()

    return (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 52,
                    borderRadius: 52,
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: "center",
                    paddingHorizontal: Spacing,
                    flexDirection: "row",

                }}
            >
                <View style={{ flex: 1 }} >
                    <Text
                        style={{
                            fontSize: FontSize.large,
                            color: colors.text,
                            opacity: 0.7,
                            marginRight: Spacing * 2
                        }}
                    >
                        What are you looking for
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: Spacing * 2, paddingVertical: Spacing, borderRadius: 52 }}>

                    <Text
                        style={{
                            fontSize: 16,
                            color: colors.card,
                            marginRight: Spacing * 2
                        }}
                    >
                        Search
                    </Text>
                    <AntDesign
                        name="search1"
                        size={24}
                        color={colors.card}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}