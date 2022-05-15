"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSharedCredentials = getSharedCredentials;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-credential-sharing' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const CredentialSharing = _reactNative.NativeModules.CredentialSharing ? _reactNative.NativeModules.CredentialSharing : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});

function getSharedCredentials(android, iOS) {
  if (_reactNative.Platform.OS === 'android' && android) {
    return CredentialSharing.getSharedCredentials(android.uri);
  } else if (_reactNative.Platform.OS === 'ios' && iOS) {
    return CredentialSharing.getSharedCredentials(iOS.service, iOS.account, iOS.accessGroup);
  } else {
    return Promise.reject('Invalid arguments provided - lets check');
  }
}
//# sourceMappingURL=index.js.map