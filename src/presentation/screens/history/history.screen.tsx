import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderComponent } from '../../components'
import Spacing from '../../constants/Spacing'
import abuseTypes, { AbuseType } from '../../../domain/entities/abuse.entity'
import ItemHistoryComponent from '../../components/card/item.history.component'
import { CustomDefaultTheme } from '../../themes/AppThemes'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontSize from '../../constants/FontSize'
import { useTheme } from '@react-navigation/native'
import Font from '../../constants/Font'
import { TabsStackScreenProps } from '../../../application/navigations/tabs.navigator'
import { ReportEntity } from '../../../domain'
import { reportsDatabaseRef } from '../../../application'
import ItemReportComponent from '../../components/card/item.report.component'


const getList = (category: string, data: any) => {

    if (category == '') {
        return data;
    } else {
        let list = data.filter((item: any) => item.title == category);
        return list;
    }
};
const getReports = (title: string, data: any) => {

    if (title == '') {
        return data;
    } else {
        let list = data.filter((item: ReportEntity) => item.s3_jenis == title);
        return list;
    }
};

export default function HistoryScreen({ navigation }: TabsStackScreenProps<"history">) {
    const { colors } = useTheme()
    const [searchText, setSearchText] = useState('');
    const [reports, setReports] = useState<ReportEntity[]>([])
    const [sortedList, setSortedList] = useState<ReportEntity[]>([]);

    useEffect(() => {
        getReports()
    }, [])

    async function getReports() {
        setReports([])
        setSortedList([])
        reportsDatabaseRef
            .on('value', snapshot => {
                // console.log('Reports data: ', snapshot.val());
                setReports([])
                if (snapshot.exists()) {
                    const dataFromFirebase: ReportEntity[] = Object.values(snapshot.val() || {});
                    setReports(dataFromFirebase)
                    setSortedList(dataFromFirebase)
                }
            })
    }

    const searchList = (search: string) => {
        if (search != '') {
            setSortedList([
                ...reports.filter((item: ReportEntity) =>
                    item.s3_jenis.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        } else {
            setSortedList(reports)
        }
    };

    const resetSearchList = () => {

        setSortedList([...reports]);
        setSearchText('');
    };

    console.log("sortedCoffee ", sortedList.length);

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: Spacing * 2 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent title={'History'} navigation={navigation} />
                <View style={styles.inputContainerComponent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: Spacing, paddingVertical: Spacing, borderRadius: Spacing * 2 }}>

                        <AntDesign
                            name="search1"
                            size={24}
                            color={colors.card}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.card,
                                marginLeft: Spacing * 2
                            }}
                        >
                            Search
                        </Text>

                    </View>
                    <TextInput style={styles.textInputContainer} placeholder='What are u looking for' value={searchText} onChangeText={text => {
                        setSearchText(text)
                        searchList(text);
                    }} placeholderTextColor={colors.text} />
                    {searchText.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => {
                                resetSearchList();

                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: Spacing, paddingVertical: Spacing, borderRadius: Spacing * 2 }}>
                                <AntDesign
                                    style={styles.inputIcon}
                                    name="close"
                                    size={FontSize.medium}
                                    color={colors.card}
                                />
                            </View>

                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>

                {
                    sortedList.map((item) => {
                        return (
                            <ItemReportComponent key={item.id} item={item} navigation={navigation} />
                            // <ItemHistoryComponent key={item.id} title={item.s3_jenis} description={item.s5_alasan} />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    inputContainerComponent: {
        flexDirection: 'row',
        marginVertical: Spacing,
        borderRadius: Spacing * 2,
        backgroundColor: CustomDefaultTheme.colors.card,
        alignItems: 'center',
        gap: Spacing
    },
    inputIcon: {
        marginHorizontal: Spacing
    },
    textInputContainer: {
        flex: 1,
        height: Spacing * 6,
        fontFamily: Font['poppins-bold'],
        fontSize: FontSize.medium,
        color: CustomDefaultTheme.colors.text
    },

})