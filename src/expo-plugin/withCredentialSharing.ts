import { 
    withPlugins,
    AndroidConfig,
    ConfigPlugin,
    createRunOncePlugin
} from '@expo/config-plugins';
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
        [AndroidConfig.Permissions.withPermissions, androidPermissions]
      ]
    );
};

export default createRunOncePlugin(withCredentialSharing, pkg.name, pkg.version);