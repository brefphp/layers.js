import {describe, test, expect} from 'vitest'
import layerVersions from "../layers.json";
import {layerArn} from "../layers";

// The two tests marked with concurrent will be run in parallel
describe('layers', () => {

    test('layerVersions', () => {
        expect(layerVersions).to.have.keys([
            "php-85",
            "php-84",
            "php-83",
            "php-82",
            "arm-php-85",
            "arm-php-84",
            "arm-php-83",
            "arm-php-82",
        ]);
        expect(layerVersions["php-82"]["us-east-1"]).to.be.a("string");
    });

    test('layerArn', () => {
        expect(layerArn('us-east-1', '8.3')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:php-83:\d+/);
        expect(layerArn('us-east-1', '8.3', 'arm')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:arm-php-83:\d+/);
        expect(layerArn('us-east-1', '8.2')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:php-82:\d+/);
        expect(layerArn('us-east-1', '8.5', 'arm')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:arm-php-85:\d+/);

        expect(() => {
            layerArn('us-east-1', '7.4', 'arm');
        }).toThrow('PHP version 7.4 in us-east-1 is not supported');
    });

});
