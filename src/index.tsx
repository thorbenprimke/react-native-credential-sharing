import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-credential-sharing' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const CredentialSharing = NativeModules.CredentialSharing
  ? NativeModules.CredentialSharing
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export type CredentialResponse = {
  accessToken: string;
  name: string;
};

export function getSharedCredentials(
  android?: {
    uri: string;
  },
  iOS?: {
    service: string;
    account: string;
    accessGroup: string;
  }
): Promise<CredentialResponse[] | string> {
  if (Platform.OS === 'android' && android) {
    return CredentialSharing.getSharedCredentials(android.uri);
  } else if (Platform.OS === 'ios' && iOS) {
    return CredentialSharing.getSharedCredentials(
      iOS.service,
      iOS.account,
      iOS.accessGroup
    );
  } else {
    return Promise.reject('Invalid arguments provided - lets check');
  }
}
