
import { 
    withPlugins,
    AndroidConfig,
    ConfigPlugin,
    createRunOncePlugin,
    withEntitlementsPlist
} from '@expo/config-plugins';
import type { ExpoConfig } from '@expo/config-types';
import type { JSONObject } from '@expo/json-file';
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const pkg = require('../../../package.json');

type Props = {
  android?: {
      usesPermissionName: string;
      providerName: string;
  },
  ios?: {
      accessGroupName: string;
      otherValue: string;
  }
};

type MutateEntitlementsPlistAction = (expo: ExpoConfig, entitlements: JSONObject) => JSONObject;

export function createEntitlementsPlugin(
  action: MutateEntitlementsPlistAction,
  name: string
): ConfigPlugin {
  const withUnknown: ConfigPlugin = config =>
    withEntitlementsPlist(config, async config => {
      config.modResults = await action(config, config.modResults);
      return config;
    });
  if (name) {
    Object.defineProperty(withUnknown, 'name', {
      value: name,
    });
  }
  return withUnknown;
}


export const withKeychainSharingGroups = createEntitlementsPlugin(
  setKeychainSharingGroups,
  'withKeychainSharingGroups'
);

export function setKeychainSharingGroups(
  config: ExpoConfig,
  { 'keychain-access-groups': _, ...entitlementsPlist }: JSONObject
): JSONObject {
  if (config.ios?.associatedDomains) {
    return {
      ...entitlementsPlist,
      'keychain-access-groups': ['$(AppIdentifierPrefix)com.pinterest.enterprise'],
    };
  }

  return entitlementsPlist;
}

const withCredentialSharing: ConfigPlugin<Props> = (config, props = {}) => {
  const androidPermissions = [];
  if (props.android) {
    if (props.android.usesPermissionName) {
      androidPermissions.push(props.android.usesPermissionName)
    }
    // TODO: handle providerName
  }
  if (props.ios) {
      // TODO: handle accessGroupName
  }

  return withPlugins(
      config,
      [
        [AndroidConfig.Permissions.withPermissions, androidPermissions],
        withKeychainSharingGroups
      ]
    );
};

export default createRunOncePlugin(withCredentialSharing, pkg.name, pkg.version);