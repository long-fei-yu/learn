import {Dimensions, PixelRatio} from 'react-native';

global.deviceParameter = {
    pw: Dimensions.get('window').width,//屏幕宽度
    ph: Dimensions.get('window').height,//屏幕高度
    bw: PixelRatio.get(),//设备的像素密度
};