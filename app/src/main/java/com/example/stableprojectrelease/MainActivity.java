package com.example.stableprojectrelease;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.stableprojectrelease.R;

public class MainActivity extends AppCompatActivity {

    // WebView object reference
    WebView webView;
    WebSettings webSettings;

    // Function triggered on app creation
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });


        webView = findViewById(R.id.webView);
        webSettings = webView.getSettings();
        // For zooming control integration
        //webSettings.setBuiltInZoomControls(true);

        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDisplayZoomControls(false);
        webSettings.setSupportZoom(true);
        webSettings.setDefaultTextEncodingName("utf-8");
        //webView.getSettings().setPluginState(WebSettings.PluginState.ON);





        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.setWebChromeClient(new WebChromeClient());
        // Web View client handles the logic that permits to
        // navigate through the various pages of the web app
        webView.setWebViewClient(new Callback());

        WebView.setWebContentsDebuggingEnabled(true);

        // For online URL rendering
        //webView.loadUrl("https://www.youtube.com/")

        // Loading local index file
        webView.loadUrl("file:///android_asset/drum/index.html");
    }

    private static class Callback extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            // Im telling to android to not override and let webView load
            return false;
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}