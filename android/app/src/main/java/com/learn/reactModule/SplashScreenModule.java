package com.learn.reactModule;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.learn.util.SplashScreen;

import java.util.Map;

import javax.annotation.Nullable;

public class SplashScreenModule extends ReactContextBaseJavaModule {

    public SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SplashScreen";
    }


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    /**
     * 打开启动屏
     */
    @ReactMethod
    public void show() {
        SplashScreen.show(getCurrentActivity());
    }

    /**
     * 关闭启动屏
     */
    @ReactMethod
    public void hide() {
        SplashScreen.hide(getCurrentActivity());
    }
}
