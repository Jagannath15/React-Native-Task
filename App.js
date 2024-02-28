import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/Login';
import Home from './src/Home';



export default function App() {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='Login'>
        <Stack.Screen
            name='Login'
            component={Login}
            options={{headerShown:false}}
        />

        <Stack.Screen
            name='Home'
            component={Home}
            options={{headerShown:false}}
        />
    </Stack.Navigator>
    </NavigationContainer>
    
  )
}
