import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Book Worm' component={HomeScreen}

        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App