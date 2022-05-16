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
  id?: string;
  username?: string;
  name?: string;
};

export async function getSharedCredentials(
  android?: {
    uri: string;
  },
  iOS?: {
    service: string;
    account: string;
    accessGroup: string;
  }
): Promise<CredentialResponse[]> {
  if (Platform.OS === 'android' && android) {
    return CredentialSharing.getSharedCredentials(android.uri);
  } else if (Platform.OS === 'ios' && iOS) {
    const result = await CredentialSharing.getSharedCredentials(
      iOS.service,
      iOS.account,
      iOS.accessGroup
    );
    if (result) {
      return Promise.resolve([
        {
          accessToken: result,
        },
      ]);
    } else {
      return Promise.resolve([]);
    }
  } else {
    return Promise.reject('Invalid arguments provided - lets check');
  }
}
