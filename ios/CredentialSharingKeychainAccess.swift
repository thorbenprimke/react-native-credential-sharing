//
//  PAFKeychainAccess.swift
//  PinterestAppFactory
//

import Foundation

class CredentialSharingKeychainAccess {
    
    // MARK: Internal
    
    static let shared: CredentialSharingKeychainAccess = CredentialSharingKeychainAccess()
    
    func accessToken(service: String, account: String, accessGroup: String) -> String? {
        password(service: service, account: account, accessGroup: accessGroup)
    }
    
    // MARK: Private
        
    private func password(service: String, account: String, accessGroup: String) -> String? {
        var query: [String: Any] = baseQuery(service: service, account: account, accessGroup: accessGroup)
        query[kSecReturnData as String] = kCFBooleanTrue
        
        var passwordData: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &passwordData)
        
        guard let data = passwordData as? Data, status == errSecSuccess else {
            return nil
        }
        return String(data: data, encoding: String.Encoding.utf8)
    }
    
    private func baseQuery(service: String, account: String, accessGroup: String) -> [String: Any] {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecAttrAccessGroup as String : accessGroup,
        ]
        return query
    }
}
