#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CredentialSharing, NSObject)

RCT_EXTERN_METHOD(getSharedCredentials:(String)a withB:(String)b withC:(String)c
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
