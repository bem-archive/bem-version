'use strict';

var Q = require('q'),
    QFS = require('q-io/fs'),
    UTIL = require('util');

/**
 * Read file contents as utf-8 string.
 *
 * @returns {String}
 */
exports.readFile = function(path) {
    return QFS.read(path, { charset: 'utf8' });
};

/**
 * Write file contents as utf-8 string.
 *
 * @param {String} path
 * @param {Array|String} content
 * @returns {Undefined}
 */
exports.writeFile = function(path, content) {
    content = Array.isArray(content) ? content.join('') : content;
    return QFS.write(path, content, { charset: 'utf8' });
};

/**
 * Executes specified command with args and options.
 *
 * @param {String} cmd
 * @param {Array} args
 * @param {Object} [options]
 * @param {Boolean} [resolveWithOutput]
 * @returns {Promise * String | Undefined}
 */
exports.execFile = function(cmd, args, options, resolveWithOutput) {

    return _execHelper(
        [cmd].concat(args).join(' '),
        require('child_process').execFile(cmd, args, options),
        resolveWithOutput);

};

function _execHelper(cmd, cp, resolveWithOutput) {

    var d = Q.defer(),
        output = '';

    cp.on('exit', function(code) {
        if (code === 0) return d.resolve(resolveWithOutput? output : null);
        d.reject(new Error(UTIL.format('%s failed: %s', cmd, output)));
    });

    cp.stderr.on('data', function(data) {
        output += data;
    });

    cp.stdout.on('data', function(data) {
        output += data;
    });

    return d.promise;

}

/**
 * Finds the first instance of a specified executable in the PATH
 * environment variable. Does not cache the results, so `hash -r` is not
 * needed when the PATH changes.
 *
 * @param {String} cmd  Command to find
 * @returns {Promise * String}  Found path
 */
exports.which = Q.nfbind(require('which'));
