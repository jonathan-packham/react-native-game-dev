import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
    MAX_WIDTH: width,
    MAX_HEIGHT: height,
    GRID_SIZE: 15,
    CELL_SIZE: 20,
}