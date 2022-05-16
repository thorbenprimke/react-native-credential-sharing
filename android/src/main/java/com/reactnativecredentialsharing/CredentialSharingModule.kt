package com.reactnativecredentialsharing

import android.annotation.SuppressLint
import android.database.Cursor
import android.net.Uri
import android.os.Build.VERSION_CODES
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap

class CredentialSharingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "CredentialSharing"
  }

  @RequiresApi(api = VERSION_CODES.O)
  @SuppressLint("Range")
  @ReactMethod
  fun getSharedCredentials(uri: String, promise: Promise) {
    val resultArray: WritableArray = WritableNativeArray()
    val contentResolver = reactApplicationContext.applicationContext.contentResolver
    var cursor: Cursor? = null
    try {
      cursor = contentResolver.query(
        Uri.parse(uri),
        null,
        null,
        null
      )
    } catch (e: Exception) {
      Log.d(name, e.message ?: "No error message provided")
      promise.resolve(resultArray)
      return
    }
    if (cursor == null) {
      promise.resolve(resultArray)
      return
    }
    if (cursor.moveToFirst()) {
      while (!cursor.isAfterLast) {
        val item: WritableMap = WritableNativeMap()
        item.putString("accessToken", cursor.getString(cursor.getColumnIndex("accessToken")))
        item.putString("id", cursor.getString(cursor.getColumnIndex("id")))
        item.putString("username", cursor.getString(cursor.getColumnIndex("username")))
        item.putString("name", cursor.getString(cursor.getColumnIndex("name")))
        resultArray.pushMap(item)
        cursor.moveToNext()
      }
    }
    promise.resolve(resultArray)
  }
}
