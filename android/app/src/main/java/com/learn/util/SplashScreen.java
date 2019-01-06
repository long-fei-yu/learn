package com.learn.util;

import android.app.Activity;
import android.app.Dialog;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import com.learn.R;

import java.lang.ref.WeakReference;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SplashScreen {

    private static WeakReference<Activity> mActivity;
    private static Dialog mSplashDialog;

    /**
     * 打开启动屏
     */
    public static void show(final Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<>(activity);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {
                    mSplashDialog = new Dialog(activity, R.style.Dialog_Fullscreen);

                    LayoutInflater mInflater = LayoutInflater.from(activity);
                    View view = mInflater.inflate(R.layout.launch_screen, null);
                    TextView timeTv = view.findViewById(R.id.time);

                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String time = sdf.format(new Date());

                    timeTv.setText(time);

                    mSplashDialog.setContentView(view);
                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        mSplashDialog.show();
                    }
                }
            }
        });
    }


    /**
     * 关闭启动屏
     */
    public static void hide(Activity activity) {
        if (activity == null) activity = mActivity.get();
        if (activity == null) return;

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                }
            }
        });
    }
}
