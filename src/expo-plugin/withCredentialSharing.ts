import { 
    withPlugins,
    // AndroidConfig,
    ConfigPlugin,
    createRunOncePlugin
} from '@expo/config-plugins';
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const pkg = require('../../../package.json');

type Props = {
  android?: {
      usesPermissionName: string;
      providerName: string;
  }
};

const withCredentialSharing: ConfigPlugin<Props> = (config, props = {}) => {
  if (config.ios == null) config.ios = {};
  if (config.ios.infoPlist == null) config.ios.infoPlist = {};
  if (props.android) {
      
  }
//   config.ios.infoPlist.NSCameraUsageDescription =
//     props.cameraPermissionText ?? (config.ios.infoPlist.NSCameraUsageDescription as string | undefined) ?? CAMERA_USAGE;
//   if (props.enableMicrophonePermission) {
//     config.ios.infoPlist.NSMicrophoneUsageDescription =
//       props.microphonePermissionText ?? (config.ios.infoPlist.NSMicrophoneUsageDescription as string | undefined) ?? MICROPHONE_USAGE;
//   }
//   const androidPermissions = ['android.permission.CAMERA'];
//   if (props.enableMicrophonePermission) androidPermissions.push('android.permission.RECORD_AUDIO');

//   if (props.disableFrameProcessors) {
//     config = withDisableFrameProcessorsAndroid(config);
//     config = withDisableFrameProcessorsIOS(config);
//   }

  return withPlugins(
      config,
      [
        //   [AndroidConfig.Permissions.withPermissions, androidPermissions]
    ]
    );
};

export default createRunOncePlugin(withCredentialSharing, pkg.name, pkg.version);