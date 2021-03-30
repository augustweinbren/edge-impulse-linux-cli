/**
 * Edge Impulse API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export class CreateOrganizationPortalRequest {
    /**
    * The name of the upload portal.
    */
    'name': string;
    /**
    * The purpose and description of the upload portal.
    */
    'description'?: string;
    /**
    * The S3 bucket id to store the uploaded data.
    */
    'bucketId': number;
    /**
    * The path in the bucket the upload portal will write to.
    */
    'bucketPath': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        },
        {
            "name": "bucketId",
            "baseName": "bucketId",
            "type": "number"
        },
        {
            "name": "bucketPath",
            "baseName": "bucketPath",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return CreateOrganizationPortalRequest.attributeTypeMap;
    }
}
