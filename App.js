import React, {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, Keyboard, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as SplashScreen from 'expo-splash-screen';
import {GameEngine} from 'react-native-game-engine';
import GameLoop from './systems/GameLoop';
import Head from './components/Head/index';
import Tail from './components/Tail/index';
import Food from './components/Food/index';
import styles from './components/styles';
import Constants from './components/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const dismissKeyboard = () => {
  Keyboard.dismiss();
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name="StartScreen"
          component={StartScreen}
          options={{
              headerShown: false,
          }}
        />
        <Stack.Screen name="GameScreen"
          component={GameScreen}
          options={
            ({route}) => ({
              title: route.params.snakeName,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                textDecorationLines: 'underline',
                color: 'blue',
              }
            })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const StartScreen = ({navigation}) => {
  //const [lastFileAdded, setLastFileAdded] = useState(null);
  const [newSnakeName, setNewSnakeName] = useState('');
  const [placeholder] = useState('Snake');
  
  navigate = (screen, snakeName) => {
    screen = screen;
    snakeName = snakeName;
    {navigation.navigate(screen, {snakeName: snakeName});};
  }

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 2000);
  }, [])

  return (
    <Pressable style={styles.container} onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Snake Game!</Text>
        <Text>Enter the name for your snake!</Text>
        <TextInput
          autoFocus
          style={styles.input}
          onChangeText={setNewSnakeName}
          value={newSnakeName}
          placeholder={placeholder}
        />
        {(newSnakeName == '') ? 
          <ActivityIndicator size='large' /> :
          <Pressable onPress={navigation.navigate('GameScreen', {snakeName: newSnakeName})} >
            <Text>Start Game!</Text>
            <View style={styles.startGame} />
          </Pressable>
        }
      </SafeAreaView>
    </Pressable>
  )
}

function GameScreen() {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetGame = () => {
    engine.current.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />
      },
    });
    setIsGameRunning(true);
  };

  return (
    <View style={styles.canvas}>
      <GameEngine
        ref={engine}
        style={{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: 'white',
        }}
        entities={{
          head: {
            position: [0, 0],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            renderer: <Head />,
          },
          food: {
            position: [
              randomPositions(0, Constants.GRID_SIZE - 1),
              randomPositions(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />
          },
        }}
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case "game-over":
              alert('Game over!');
              setIsGameRunning(false);
              return;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity 
            onPress={() => engine.current.dispatch('move-up')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-left')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, {backgroundColor: null}]} />
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-right')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-down')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        <TouchableOpacity onPress={resetGame}>
          <Text 
            style={{
              color: 'white',
              marginTop: 15,
              fontSize: 22,
              padding: 10,
              backgroundColor: 'grey',
              borderRadius: 10
            }}
          >
            Start New Game
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
