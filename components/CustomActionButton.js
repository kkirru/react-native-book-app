import React, { Children } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CustomActionButton = ({ onPress, style, children }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, style]}
        >
            <View>
                {children}
            </View>
        </TouchableOpacity>
    )
}

export default CustomActionButton

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
