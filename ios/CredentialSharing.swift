import Foundation

@objc(CredentialSharing)
class CredentialSharing: NSObject {

    @objc(getSharedCredentials:withB:withC:withResolver:withRejecter:)
    func getSharedCredentials(
     service: String, account: String, accessGroup: String,
     resolve: RCTPromiseResolveBlock,
     reject: RCTPromiseRejectBlock) -> Void {
         resolve(CredentialSharingKeychainAccess.shared.accessToken(service: service, account: account, accessGroup: accessGroup))
    }
}
