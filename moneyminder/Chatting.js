import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 추가

const Chatting = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        setMessages(prevMessages => [
            ...prevMessages,
            { text: message, isUser: true },
            { text: `Your message is: "${message}"`, isUser: false }
        ]);
        setMessage("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.chatBox}>
                <Text style={styles.title}>Chat</Text>
                <ScrollView style={styles.messagesList}>
                    {messages.map((message, index) => (
                        <Message key={index} {...message} />
                    ))}
                </ScrollView>
                <View style={styles.messageForm}>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type your message..."
                        style={styles.messageInput}
                    />
                    <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Message = ({ text, isUser }) => {
    return (
        <View style={isUser ? styles.userMessage : styles.aiMessage}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    chatBox: {
        width: '90%', // Use percentage to make it responsive
        height: '95%', // Use percentage to make it responsive
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.13,
        shadowRadius: 24,
        overflow: 'hidden',
        flexDirection: 'column',
    },
    title: {
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 0,
        fontWeight: 'bold',
        fontSize: 24,
    },
    messagesList: {
        padding: 20,
        flexGrow: 1,
    },
    userMessage: {
        marginBottom: 20,
        maxWidth: '80%',
        alignSelf: 'flex-end',
        backgroundColor: '#FF1493',
        color: '#fff',
        padding: 10,
        borderRadius: 16,
    },
    aiMessage: {
        marginBottom: 20,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        backgroundColor: '#FF1493',
        color: '#fff',
        padding: 10,
        borderRadius: 16,
    },
    messageForm: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageInput: {
        flexGrow: 1,
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    sendButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        backgroundColor: '#FF1493',
        color: '#fff',
        cursor: 'pointer',
    },
    messageText: {
        color: '#fff',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Chatting;

