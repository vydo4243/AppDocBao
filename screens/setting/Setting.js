import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { Switch } from 'react-native';
// import { Slider } from 'react-native-elements';

const Setting = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Settings</Text>
            <View style={styles.settingItem}>
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                />
            </View>
            <View style={styles.settingItem}>
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Font Size: {fontSize}</Text>
                {/* <Slider
                        style={{ width: 200 }}
                        minimumValue={14}
                        maximumValue={32}
                        step={1}
                        value={fontSize}
                        onValueChange={value => setFontSize(value)}
                /> */}
            </View>
            <Button
                title="Go Back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Setting;