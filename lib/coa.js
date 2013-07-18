'use strict';

var PATH = require('path');

module.exports = require('coa').Cmd()
    .name(PATH.basename(process.argv[1]))
    .apply(require('./version'))
    .completable();
