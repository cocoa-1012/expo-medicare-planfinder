package com.sigmasolve.medicare_factfinder.review;

import androidx.annotation.NonNull;

import android.app.Activity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.play.core.review.testing.FakeReviewManager;
import com.google.android.play.core.tasks.OnCompleteListener;
import com.google.android.play.core.tasks.Task;

public class ReviewModule extends ReactContextBaseJavaModule {
      private static ReactApplicationContext staticReactContext;

      ReviewModule(ReactApplicationContext reactContext){
            super(reactContext);
            staticReactContext = reactContext;
      }

      @NonNull
      @Override
      public String getName() {
            return "Review";
      }


      @ReactMethod
      void rateApp(){
            // DEV TEST
            // final ReviewManager manager = new FakeReviewManager(this.getReactApplicationContext());
            final ReviewManager manager = ReviewManagerFactory.create(this.getReactApplicationContext());
            Task<ReviewInfo> request = manager.requestReviewFlow();
            request.addOnCompleteListener(new OnCompleteListener<ReviewInfo>() {
                  @Override
                  public void onComplete(@NonNull final Task<ReviewInfo> requestTask) {
                        if (requestTask.isSuccessful()) {
                              ReviewInfo reviewInfo = requestTask.getResult();
                              Activity activity = getCurrentActivity();
                              if (activity == null) return;
                              Task<Void> flow = manager.launchReviewFlow(activity, reviewInfo);
                              flow.addOnCompleteListener(new OnCompleteListener<Void>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Void> flowTask) {
                                         System.out.println("ONCOMPLETE");
                                    }
                              });
                        } else {
                              System.out.println("ERROR!!!");
                        }
                  }
            });
      }
}
