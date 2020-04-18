import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class BookCount extends Component {

    render() {
        const { title, count } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>
                    {title}
                </Text>
                <Text>
                    {count}
                </Text>
            </View>
        )
    }
}



