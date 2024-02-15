/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const isValidMobileNumber = (num) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(num);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fetchdataapi = () => {
        if (isValidMobileNumber(username) && password) {
            fetch(`http://192.168.73.81/api/login.php?username=${username}&password=${password}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log('responsestring=' + JSON.stringify(responseData));
                    if (responseData.status === 'success') {
                       // alert(responseData.message);
                        const userData = responseData.user;
                        navigation.navigate('Welcome', { userData });
                    } else {
                        alert('Login failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            alert('Invalid mobile number or password ');
        }
    };
    return (
        <ImageBackground
            source={require('./images/black.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Image
                    source={require('./images/netflix.png')}
                    style={styles.imageStyle}
                />
                <View style={styles.netflixContainer}>
                    <Text style={styles.netflixText}>
                        Watch TV shows and movies anytime  anywhere
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Mobile Number:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Enter your username"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Password:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter your password"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                    >
                        <Text style={styles.togglePassword}>
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={fetchdataapi}>
                        <Text style={styles.buttonText}>Sign in </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    imageStyle: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 10,
    },
    netflixContainer: {
        marginBottom: 60,
    },
    netflixText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Arial',
        textTransform: 'capitalize',
        letterSpacing: 2,
        lineHeight: 24,
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        color: 'white',
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        padding: 10,
        width: 320,
        fontSize: 16,
        color: 'white',
        backgroundColor: 'lightblue',
    },
    buttonContainer: {
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    togglePassword: {
        color: 'white',
        marginTop: 6,
        textAlign: 'right',
        textDecorationLine: 'underline',
    },
});

export default Login;