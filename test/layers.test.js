import {describe, test, expect} from 'vitest'
import layerVersions from "../layers.json";
import {consoleLayerArn, fpmLayerArn, functionLayerArn} from "../layers";

// The two tests marked with concurrent will be run in parallel
describe('layers', () => {

    test('layerVersions', () => {
        expect(layerVersions).to.have.keys([
            "php-84",
            "php-84-fpm",
            "php-83",
            "php-83-fpm",
            "php-82",
            "php-82-fpm",
            "php-81",
            "php-81-fpm",
            "php-80",
            "php-80-fpm",
            "arm-php-84",
            "arm-php-84-fpm",
            "arm-php-83",
            "arm-php-83-fpm",
            "arm-php-82",
            "arm-php-82-fpm",
            "arm-php-81",
            "arm-php-81-fpm",
            "arm-php-80",
            "arm-php-80-fpm",
            "console",
        ]);
        expect(layerVersions["php-82"]["us-east-1"]).to.be.a("string");
    });

    test('functionLayerArn', () => {
        expect(functionLayerArn('us-east-1', '8.3')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:php-83:\d+/);
        expect(functionLayerArn('us-east-1', '8.3', 'arm')).matches(/arn:aws:lambda:eu-west-1:873528684822:layer:arm-php-83:\d+/);
        expect(functionLayerArn('us-east-1', '8.2')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:php-82:\d+/);
        expect(functionLayerArn('us-east-1', '8.1', 'arm')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:arm-php-81:\d+/);

        expect(() => {
            functionLayerArn('us-east-1', '7.4', 'arm');
        }).toThrow('PHP version 7.4 in us-east-1 is not supported');
    });

    test('fpmLayerArn', () => {
        expect(fpmLayerArn('us-east-1', '8.3')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:php-83-fpm:\d+/);
        expect(fpmLayerArn('us-east-1', '8.3', 'arm')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:arm-php-83-fpm:\d+/);
        expect(fpmLayerArn('us-east-1', '8.2')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:php-82-fpm:\d+/);
        expect(fpmLayerArn('us-east-1', '8.1', 'arm')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:arm-php-81-fpm:\d+/);

        expect(() => {
            fpmLayerArn('us-east-1', '7.4', 'arm');
        }).toThrow('PHP version 7.4 in us-east-1 is not supported');
    });

    test('consoleLayerArn', () => {
        expect(consoleLayerArn('us-east-1')).matches(/arn:aws:lambda:us-east-1:873528684822:layer:console:\d+/);

        expect(() => {
            consoleLayerArn('us-east-99');
        }).toThrow('Console layer does not exist in region us-east-99');
    });

});
