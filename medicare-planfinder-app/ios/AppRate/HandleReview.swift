//
//  HandleReview.swift
//  AlbarakaApp
//
//  Created by arslanyakup on 11.08.2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import StoreKit
import UIKit

@objc(Review)
class Review: RCTViewManager {

  @available(iOS 10.3, *)
  @objc func rateApp() {
      SKStoreReviewController.requestReview()
  }
   
}
