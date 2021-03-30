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

import { TunerTrialKerasTunerTrialHyperparametersSpace } from './tunerTrialKerasTunerTrialHyperparametersSpace';
import { TunerTrialKerasTunerTrialHyperparametersValues } from './tunerTrialKerasTunerTrialHyperparametersValues';

export class TunerTrialKerasTunerTrialHyperparameters {
    'space'?: TunerTrialKerasTunerTrialHyperparametersSpace;
    'values'?: TunerTrialKerasTunerTrialHyperparametersValues;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "space",
            "baseName": "space",
            "type": "TunerTrialKerasTunerTrialHyperparametersSpace"
        },
        {
            "name": "values",
            "baseName": "values",
            "type": "TunerTrialKerasTunerTrialHyperparametersValues"
        }    ];

    static getAttributeTypeMap() {
        return TunerTrialKerasTunerTrialHyperparameters.attributeTypeMap;
    }
}
