import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const Chatting = () => {
    const [data, setData] = useState(null);
    console.log(Constants);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!Constants) {
                    console.error('Constants is null or undefined');
                    return;
                }

                const baseURL = `http://172.20.10.2:8080/api/account/test`;
                const response = await axios.get(baseURL);
                setData(response.data);
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>expo</Text>
        </View>
    );
};

export default Chatting;
