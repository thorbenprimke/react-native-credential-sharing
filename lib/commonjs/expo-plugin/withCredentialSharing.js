"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntitlementsPlugin = createEntitlementsPlugin;
exports.default = void 0;
exports.setKeychainSharingGroups = setKeychainSharingGroups;
exports.withKeychainSharingGroups = void 0;
var _configPlugins = require("@expo/config-plugins");
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const pkg = require('../../../package.json');
function createEntitlementsPlugin(action, name) {
  const withUnknown = config => (0, _configPlugins.withEntitlementsPlist)(config, async config => {
    config.modResults = await action(config, config.modResults);
    return config;
  });
  if (name) {
    Object.defineProperty(withUnknown, 'name', {
      value: name
    });
  }
  return withUnknown;
}
const withKeychainSharingGroups = createEntitlementsPlugin(setKeychainSharingGroups, 'withKeychainSharingGroups');
exports.withKeychainSharingGroups = withKeychainSharingGroups;
function setKeychainSharingGroups(config, _ref) {
  var _config$ios;
  let {
    'keychain-access-groups': _,
    ...entitlementsPlist
  } = _ref;
  if ((_config$ios = config.ios) !== null && _config$ios !== void 0 && _config$ios.associatedDomains) {
    return {
      ...entitlementsPlist,
      'keychain-access-groups': ['$(AppIdentifierPrefix)com.pinterest.enterprise']
    };
  }
  return entitlementsPlist;
}
const withCredentialSharing = function (config) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const androidPermissions = [];
  if (props.android) {
    if (props.android.usesPermissionName) {
      androidPermissions.push(props.android.usesPermissionName);
    }
    // TODO: handle providerName
  }

  if (props.ios) {
    // TODO: handle accessGroupName
  }
  return (0, _configPlugins.withPlugins)(config, [[_configPlugins.AndroidConfig.Permissions.withPermissions, androidPermissions], withKeychainSharingGroups]);
};
var _default = (0, _configPlugins.createRunOncePlugin)(withCredentialSharing, pkg.name, pkg.version);
exports.default = _default;
//# sourceMappingURL=withCredentialSharing.js.map