import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';



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
