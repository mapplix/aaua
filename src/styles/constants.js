import {Dimensions} from 'react-native';

export const MIN_HEIGHT = 640;
export const MIN_WIDTH = 360;

const {height, width} = Dimensions.get('window');
export const RATIO = Math.round((height/MIN_HEIGHT) * 100) /100;
export const WIDTH_RATIO = Math.round((width/MIN_WIDTH) * 100) /100;
export const WIDTH = width;
export const HEIGHT = height;
