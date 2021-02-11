import {NativeModules} from 'react-native';

export default class NativeUtil {

    /**
     * 关闭启动屏
     */
    static hideSplash = () => {
        NativeModules.SplashScreen.hide();
    }

}