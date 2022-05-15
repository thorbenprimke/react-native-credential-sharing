import { withPlugins, AndroidConfig, createRunOncePlugin } from '@expo/config-plugins'; // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment

const pkg = require('../../../package.json');

const withCredentialSharing = function (config) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const androidPermissions = [];

  if (props.android) {
    if (props.android.usesPermissionName) {
      androidPermissions.push(props.android.usesPermissionName);
    } // TODO: handle providerName

  }

  if (props.ios) {// TODO: handle accessGroupName
  }

  return withPlugins(config, [[AndroidConfig.Permissions.withPermissions, androidPermissions]]);
};

export default createRunOncePlugin(withCredentialSharing, pkg.name, pkg.version);
//# sourceMappingURL=withCredentialSharing.js.map