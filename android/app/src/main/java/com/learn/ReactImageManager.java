package com.learn;

import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.ReactImageView;

public class ReactImageManager extends SimpleViewManager {

    private GlobalImageLoadListener globalImageLoadListener;
    private Object mCallerContext;

    @Override
    public String getName() {
        return "RCTImageView";
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        return new ReactImageView(reactContext, Fresco.newDraweeControllerBuilder(), globalImageLoadListener, mCallerContext);
    }

    @ReactProp(name = "src")
    public void setSec(ReactImageView imageView, @Nullable ReadableArray sources) {
        imageView.setSource(sources);
    }
}
