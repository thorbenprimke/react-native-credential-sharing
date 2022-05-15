"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configPlugins = require("@expo/config-plugins");

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
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

  return (0, _configPlugins.withPlugins)(config, [[_configPlugins.AndroidConfig.Permissions.withPermissions, androidPermissions]]);
};

var _default = (0, _configPlugins.createRunOncePlugin)(withCredentialSharing, pkg.name, pkg.version);

exports.default = _default;
//# sourceMappingURL=withCredentialSharing.js.map