/** @type {Record<string, Record<string, string>>} */
const layerVersions = require('./layers.json');

/**
 * Returns the ARN for the function layer.
 * @param {string} region
 * @param {string} phpVersion (e.g. '8.1')
 * @returns {string} Layer ARN
 */
function functionLayerArn(region, phpVersion) {
    const layerName = 'php-' + phpVersion.replace('.', '');
    const version = layerVersions[layerName][region];
    return `arn:aws:lambda:${region}:534081306603:layer:${layerName}:${version}`;
}

/**
 * Returns the ARN for the FPM layer.
 * @param {string} region
 * @param {string} phpVersion (e.g. '8.1')
 * @returns {string} Layer ARN
 */
function fpmLayerArn(region, phpVersion) {
    const layerName = 'php-' + phpVersion.replace('.', '') + '-fpm';
    const version = layerVersions[layerName][region];
    return `arn:aws:lambda:${region}:534081306603:layer:${layerName}:${version}`;
}

/**
 * Returns the ARN for the Console layer.
 * @param {string} region
 * @returns {string} Layer ARN
 */
function consoleLayerArn(region) {
    const version = layerVersions.console[region];
    return `arn:aws:lambda:${region}:534081306603:layer:console:${version}`;
}

module.exports = {
    // Expose the JSON data as a JS dependency for easier use in programmatic environments
    layerVersions: layerVersions,
    functionLayerArn,
    fpmLayerArn,
    consoleLayerArn,
};
