import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { WizardStore } from '../../../application/store/store';
import { TextInput } from 'react-native-paper';
import Spacing from '../../constants/Spacing';

interface props {
    control: any,
    errors: any,
}
export default function Step1({ control, errors }: props) {

    return (
        <View style={{ margin: Spacing * 2 }}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        mode="outlined"
                        label="Full Name"
                        placeholder="Enter Full Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="fullName"
            />
            {errors.fullName && (
                <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                    This is a required field.
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({})