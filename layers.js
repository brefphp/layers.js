/** @type {Record<string, Record<string, string>>} */
const layerVersions = require('./layers.json');

/**
 * Returns the ARN for the function layer.
 * @param {string} region
 * @param {string} phpVersion (e.g. '8.1')
 * @param {'x86'|'arm'} platform
 * @returns {string} Layer ARN
 */
function functionLayerArn(region, phpVersion, platform = 'x86') {
    let layerName = 'php-' + phpVersion.replace('.', '');
    if (platform === 'arm') {
        layerName = 'arm-' + layerName;
    }
    const version = layerVersions[layerName]?.[region];
    if (!version) {
        throw new Error(`PHP version ${phpVersion} in ${region} is not supported`);
    }
    return `arn:aws:lambda:${region}:534081306603:layer:${layerName}:${version}`;
}

/**
 * Returns the ARN for the FPM layer.
 * @param {string} region
 * @param {string} phpVersion (e.g. '8.1')
 * @param {'x86'|'arm'} platform
 * @returns {string} Layer ARN
 */
function fpmLayerArn(region, phpVersion, platform = 'x86') {
    let layerName = 'php-' + phpVersion.replace('.', '') + '-fpm';
    if (platform === 'arm') {
        layerName = 'arm-' + layerName;
    }
    const version = layerVersions[layerName]?.[region];
    if (!version) {
        throw new Error(`PHP version ${phpVersion} in ${region} is not supported`);
    }
    return `arn:aws:lambda:${region}:534081306603:layer:${layerName}:${version}`;
}

/**
 * Returns the ARN for the Console layer.
 * @param {string} region
 * @returns {string} Layer ARN
 */
function consoleLayerArn(region) {
    const version = layerVersions.console[region];
    if (!version) {
        throw new Error(`Console layer does not exist in region ${region}`);
    }
    return `arn:aws:lambda:${region}:534081306603:layer:console:${version}`;
}

module.exports = {
    // Expose the JSON data as a JS dependency for easier use in programmatic environments
    layerVersions,
    functionLayerArn,
    fpmLayerArn,
    consoleLayerArn,
};
