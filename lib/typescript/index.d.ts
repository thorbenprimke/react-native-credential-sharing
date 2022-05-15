export declare type CredentialResponse = {
    accessToken: string;
    name: string;
};
export declare function getSharedCredentials(android?: {
    uri: string;
}, iOS?: {
    service: string;
    account: string;
    accessGroup: string;
}): Promise<CredentialResponse[] | string>;
