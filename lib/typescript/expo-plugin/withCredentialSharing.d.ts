import { ConfigPlugin } from '@expo/config-plugins';
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
declare const _default: ConfigPlugin<Props>;
export default _default;
