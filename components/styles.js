import {StyleSheet} from 'react-native';
import Constants from './constants';

const styles = StyleSheet.create({
    canvas: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      height: '100%',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlBtn: {
      backgroundColor: 'grey',
      width: 75,
      height: 75,
      borderRadius: 10,
    },
    controlContainer: {
      width: Constants.MAX_WIDTH,
      marginTop: 10,
    },
    controllerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: 200,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },  
    startGame: {
      color: 'blue',
      height: 30,
      width: 50,
      padding: 10,
    },  
    title: {
      fontWeight: 'bold',
      fontSize: 35,
      color: 'blue',
    },
});

export default styles;