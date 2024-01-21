import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { schedulesDatabaseRef } from '../../../application';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity';

interface props {
    reportId: string
}
export default function ItemScheduleComponent({ reportId }: props) {
    const [date, setDate] = useState<string>("")
    useEffect(() => {
        schedulesDatabaseRef.child(reportId)
            .once('value')
            .then(snapshot => {
                const schedule = snapshot.val() as ScheduleEntity
                setDate(schedule.date)
                console.log({ schedule });

            });
    }, [])
    return (
        <View>
            <Text>Mohon untuk datang ke kantor pada tanggal <Text style={{ fontWeight: '900', fontSize: 16 }}>{date}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({})