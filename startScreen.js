import React, {Component} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button, Text, TextInput, View} from 'react-native';
import * as FileSystem from 'expo-file-system';

export default class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastFileAdded: null,
            snakeName: '',
        }
    }

    setLastFileAdded(filename) {
        this.setState({
            lastFileAdded: filename,
        });
    }

    createNewFile = async () => {
        let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        let randomNum = ("" + Math.random()).substring(2, 8);
        let directory = 'Snake Game' + randomNum + timestamp;
        let fileName = 'Snake Name';

        await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + directory + '/' + fileName
        )
        
        await FileSystem.writeAsStringAsync(
            FileSystem.documentDirectory + directory + '/' + fileName, 
            this.state.snakeName,
        )
        this.setLastFileAdded(fileName);
    }   

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style='auto' />
                <View style={styles.container}>
                    <Text style={styles.title}>Snake Game!</Text>
                    <Text>Enter Name of your snake!</Text>
                    <TextInput
                        style={styles.input}
                        value={snakeName}
                        placeholder='Snake Name'
                        onChangeText={e => this.setState({snakeName: e})}
                    />
                    <Button style={styles.startGame} title='Start Game' onPress={this.createNewFile} />
                </View>
            </View>
        )
    }
}