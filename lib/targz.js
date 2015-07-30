// targz - Simple tar.gz compression and decompression for NodeJS.
// Based on https://github.com/lafin/node-targz
// Copyright (c) 2015 Miska Kaipiainen
// MIT license

var fs = require('fs');
var tar = require('tar-fs');
var zlib = require('zlib');

module.exports = {

    compress: function (opts, callback) {

        // utility
        var error = function (error) {
            callback(error);
        };

        // ensure callback
        callback = callback || function () {};

        // ensure opts
        opts = opts || {};
        opts.tar = opts.tar || {};
        opts.gz = opts.gz || {};

        // default gzip config
        opts.gz.level = opts.gz.level || 6;
        opts.gz.memLevel = opts.gz.memLevel || 6;

        // ensure src and dest
        if(!opts.src) return error("No source for compress!");
        if(!opts.dest) return error("No destination for compress!");

        // go
        process.nextTick(function () {
            tar.pack(opts.src, opts.tar)
                .on('error', error)
                .pipe(zlib.createGzip(opts.gz)
                    .on('error', error))
                .pipe(fs.createWriteStream(opts.dest)
                    .on('error', error)
                    .on('finish', callback));
        });
    },

    decompress: function (opts, callback) {

        // utility
        var error = function (error) {
            callback(error);
        };

        // ensure callback
        callback = callback || function () {};

        // ensure opts
        opts = opts || {};
        opts.tar = opts.tar || {};
        opts.gz = opts.gz || {};

        // ensure src and dest
        if(!opts.src) return error("No source for decompress!");
        if(!opts.dest) return error("No destination for decompress!");

        // go
        process.nextTick(function () {
            fs.createReadStream(opts.src)
                .on('error', error)
                .pipe(zlib.createGunzip(opts.gz)
                    .on('error', error))
                .pipe(tar.extract(opts.dest, opts.tar)
                    .on('error', error)
                    .on('finish', callback));
        });
    }

};