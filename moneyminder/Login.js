import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://172.20.10.2:8080/login', {
                account: account, 
                password: password
            });
            
            // 로그인 성공
            console.log('Login successful:', response.data);
            // id,토큰을 AsyncStorage에 저장
            await AsyncStorage.setItem('userId', response.data.id.toString());
            await AsyncStorage.setItem('userToken', response.data.token);
        } catch (error) {
            // 로그인 실패
            console.error('Login failed:', error);
            setError("Invalid account or password");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={account}
                onChangeText={setAccount}
                placeholder="Account" 
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: 'hotpink',
        borderRadius: 5,
        color: 'hotpink',
    },
    button: {
        backgroundColor: 'hotpink',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'hotpink',
        marginTop: 10,
    },
});

export default Login;
