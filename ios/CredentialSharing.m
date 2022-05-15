#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CredentialSharing, NSObject)

RCT_EXTERN_METHOD(getSharedCredentials:(NSString *)a withB:(NSString *)b withC:(NSString *)c
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
