import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spacing from '../../constants/Spacing';

export default function DividerWithText() {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>OR</Text>
            <View style={styles.line} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing * 2,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'white',
        marginHorizontal: 10,
    },
});

