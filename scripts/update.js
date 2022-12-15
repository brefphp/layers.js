const fs = require('fs');
const {LambdaClient, ListLayerVersionsCommand} = require('@aws-sdk/client-lambda');
const {regions} = require('./regions');
const chunk = require('chunk');

const layerNames = [
    'php-82',
    'php-82-fpm',
    'php-81',
    'php-81-fpm',
    'php-80',
    'php-80-fpm',
    'arm-php-81',
    'arm-php-81-fpm',
    'arm-php-80',
    'arm-php-80-fpm',
    'console',
];

(async () => {
    const list = {};

    // Process regions in parallel
    for (const regionChunk of chunk(regions, 4)) {
        const promises = regionChunk.map(async (region) => {
            const client = new LambdaClient({region});
            const layers = await listLayers(client, region);

            for (const layerName of layerNames) {
                if (!list[layerName]) {
                    list[layerName] = {};
                }
                list[layerName][region] = layers[layerName] ?? '';
            }

            console.log(region);
        });

        await Promise.all(promises);
    }

    // Sort regions
    for (const layerName of layerNames) {
        list[layerName] = Object.fromEntries(Object.entries(list[layerName]).sort());
    }

    fs.writeFileSync('layers.json', JSON.stringify(list, null, 4));
    console.log('Done');
})();

/**
 * @param {LambdaClient} lambdaClient
 * @param {string} region
 * @returns {Promise<Record<string, string>>}
 */
async function listLayers(lambdaClient, region) {
    const layers = {};

    for (const layerName of layerNames) {
        const response = await lambdaClient.send(new ListLayerVersionsCommand({
            LayerName: `arn:aws:lambda:${region}:534081306603:layer:${layerName}`,
            MaxItems: 1,
        }));
        const versions = response.LayerVersions;
        if (versions.length > 0) {
            // Latest version
            layers[layerName] = versions[versions.length - 1].Version.toString();
        }
    }

    return layers;
}
