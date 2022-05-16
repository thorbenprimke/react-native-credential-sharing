import { ConfigPlugin } from '@expo/config-plugins';
import type { ExpoConfig } from '@expo/config-types';
import type { JSONObject } from '@expo/json-file';
declare type Props = {
    android?: {
        usesPermissionName: string;
        providerName: string;
    };
    ios?: {
        accessGroupName: string;
        otherValue: string;
    };
};
declare type MutateEntitlementsPlistAction = (expo: ExpoConfig, entitlements: JSONObject) => JSONObject;
export declare function createEntitlementsPlugin(action: MutateEntitlementsPlistAction, name: string): ConfigPlugin;
export declare const withKeychainSharingGroups: ConfigPlugin<void>;
export declare function setKeychainSharingGroups(config: ExpoConfig, { 'keychain-access-groups': _, ...entitlementsPlist }: JSONObject): JSONObject;
declare const _default: ConfigPlugin<Props>;
export default _default;
