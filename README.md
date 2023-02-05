NPM package to use Bref runtimes on AWS Lambda.

This package is useful is you need to reference the Bref layers from a NodeJS application. For example if you use the **AWS CDK**, **Pulumi**, etc.

> **Note**
> 
> If you are using the AWS CDK, you might be interested in [the `@bref.sh/constructs` package](https://github.com/brefphp/constructs) instead.

## Installation

```bash
npm install @bref.sh/layers
```

## Version compatibility with Bref

This package is compatible with Bref 2.0 and above.

This NPM package and Bref are compatible as long as they have the same **major** version. For example:

- v**2**.x.y of this package is compatible with v**2**.z.w of Bref
- v**3**.x.y of this package is **NOT** compatible with v**2**.z.w of Bref
- v**2**.x.y of this package is **NOT** compatible with v**1**.z.w of Bref
- etc.

All minor and patch versions are not important. Only the major version matters. That means you can upgrade Bref separately from upgrading this package (though it's always good to stay on the latest versions).

## Usage

Get a layer version:

```js
import { layerVersions } from '@bref.sh/layers';

console.log(layerVersions['php-82']['us-east-1']);
console.log(layerVersions['php-82-fpm']['eu-west-3']);
```

Helpers to get a full ARN:

```js
import { functionLayerArn, fpmLayerArn, consoleLayerArn } from '@bref.sh/layers';

console.log(functionLayerArn(region, '8.2'));
console.log(functionLayerArn(region, '8.1', 'arm'));

console.log(fpmLayerArn(region, '8.2'));
console.log(fpmLayerArn(region, '8.1', 'arm'));

console.log(consoleLayerArn(region));
```
