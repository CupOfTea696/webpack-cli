#!/usr/bin/env node

'use strict';
require('v8-compile-cache');

const importLocal = require('import-local');
const runCLI = require('../lib/bootstrap');
const utils = require('../lib/utils');

// Prefer the local installation of `webpack-cli`
if (importLocal(__filename)) {
    return;
}

process.title = 'webpack';

if (utils.packageExists('webpack')) {
    runCLI(process.argv);
} else {
    const { promptInstallation, logger, colors } = utils;

    promptInstallation('webpack', () => {
        utils.logger.error(`It looks like ${colors.bold('webpack')} is not installed.`);
    })
        .then(() => {
            logger.success(`${colors.bold('webpack')} was installed successfully.`);

            runCLI(process.argv);
        })
        .catch(() => {
            logger.error(`Action Interrupted, Please try once again or install ${colors.bold('webpack')} manually.`);

            process.exit(2);
        });
}
