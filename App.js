import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App(){
    const [mood, setMood] = useState(null);

    useEffect(() => {
        const loadMood = async () => {
            const storedMood = await AsyncStorage.getItem('mood');
            if(storedMood) setMood (storedMood);
        };
        loadMood();
    }, []);

    const selectMood = async (newMood) => {
        setMood(newMood);
        await AsyncStorage.setItem('mood', newMood);
    };
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.heading}>
                How are you feeling?
            </Text>

            <View style = {styles.buttonGroup}>
                <Button title = "😊 Happy" onPress = {() => selectMood('Happy')}/>
                <Button title = "😭 Sad" onPress = {() => selectMood('Sad')}/>
                <Button title = "😴 Tired" onPress = {() => selectMood('Tired')}/>    
            </View>

            <Text style = {styles.result}>
                {mood ? `You are feeling: ${mood}` : 'No mood selected yet.'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffef4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    heading: {
        fontSize: 24,
        marginBottom: 20,
    },

    buttonGroup: {
        gap: 10,
        width: '100%',
        marginBottom: 30,
    },

    result: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#444',
    },
});