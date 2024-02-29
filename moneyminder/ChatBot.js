import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const { height, width } = Dimensions.get("window");

function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '안녕하세요! 반가워요 :D',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: require('./assets/images/chatbot2.png')
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>챗봇</Text>
            </View>
            <GiftedChat
                placeholder={'메세지를 입력하세요...'}
                alwaysShowSend={true}
                messages={messages}
                textInputProps={{ keyboardAppearance: 'dark', autoCorrect: false }}
                onSend={messages => onSend(messages)}
                user={{ _id: 1 }}
                renderInputToolbar={props => (
                    <View style={styles.inputToolbar}>
                        <TextInput
                            {...props}
                            style={styles.input}
                            placeholder="메세지를 입력하세요..."
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={() => props.onSend({ text: props.text.trim() }, true)}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' ,fontSize: 14,}}>전송</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingVertical: 30,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 30,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: "900",
    },
    inputToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,

        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        width:40,
        height:40,
        borderColor: '#ccc',
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#4169e1',
        paddingHorizontal:14,
        paddingVertical: 12,
        borderRadius: 20,
        width:50,
        height:40,
    }
});

export default ChatScreen;
