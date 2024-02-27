import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@sankeysolutionscom$/;
        return emailRegex.test(email);
    }
      
    function validatePassword(password) {
        return password.length >= 8;
    }

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    const handleSubmit = () => {
        if (isEmailValid && isPasswordValid) {

            if(email==='shreyash.b@sankeysolutionscom' && password==='Shrey@12'){
                navigation.replace('Home',{
                    name:'Shreyash',
                    ucolor:"#82dbe1",
                    fcolor:"black"
                })
            }



            if(email==='ashwin.s@sankeysolutionscom' && password==='ash@1005'){
                navigation.replace('Home',{
                    name:'Ashwin',
                    ucolor:"#fca1e4",
                    fcolor:"white"
                })
            }
            

        } 
        else if(email==='' || password===''){
            Alert.alert('Email or Password cannot be Blank')
        }
         else {
            Alert.alert("Invalid email or password");
        }
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.busLogo}>
                <Image source={require('../AwesomeProject1/assets/bus.jpg')} style={styles.avatar} />
            </View>

            <View>
                <TextInput
                    style={styles.inputBox}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor='gray'
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor='gray'
                />
            </View>

            <TouchableOpacity style={styles.buttonBox} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#231246",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busLogo: {
        width: 200,
        height: 200,
        marginBottom: 40,
        borderRadius: 100,
        overflow: 'hidden',
    },
    avatar: {
        flex: 1,
        width: "100%", 
        height: "100%", 
        resizeMode: 'cover', 
    },
    inputBox: {
        padding: 11,
        width: Dimensions.get('window').width*0.9,
        marginVertical: 15,
        height: 50,
        backgroundColor: "white",
        borderRadius: 25,
        color:'black',
    },
    buttonBox: {
        marginTop: 60,
        height: 50,
        width: 120,
        backgroundColor: "#ea6dfc",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: '700'
    }
});
