# TarGz for NodeJS

Simple tar.gz compression and decompression for NodeJS.

## Installation

```
npm install targz
```

## Simple Usage

```javascript

var targz = require('targz');

// compress files into tar.gz archive
targz.compress({
    src: 'path_to_files',
    dest: 'path_to_compressed_file'
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Done!");
    }
});

// decompress files from tar.gz archive
targz.decompress({
    src: 'path_to_compressed file',
    dest: 'path_to_extract'
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Done!");
    }
});

```

## Advanced Usage

You can adjust tar and gzip/gunzip parameters by using optional parameters. The API:

```javascript

// Compress API
targz.compress( options, callback );

// Decompress API
targz.decompress( options, callback );

```

Where supported options are:

* **src** - (String) The path to files to be compressed
* **dest** - (String) The path to tar.gz file to be created
* **tar** - (Object) Adjust tar options. See [tar-fs](https://github.com/mafintosh/tar-fs) docs for details. OPTIONAL.
  * **ignore** - (Function) Ignore/filter files
  * **entries** - (Array) Define list of files
  * **map** - (Function) Modify the headers
  * **mapStream** - (Function) Modify the input/output file streams
  * **dmode** - (Number) Set the permissions for directories
  * **fmode** - (Number) Set permissions for files
  * **strict** - (Boolean) Ignore errors due to unsupported entry types (like device files). Default: true
  * **dereference** - (Boolean) Pack the contents of the symlink instead of the link itself. Default: false
* **gz** - (Object) Adjust gzip/gunzip options. See [zlib](https://nodejs.org/api/zlib.html#zlib_options) docs for details. OPTIONAL.

**Example**

```javascript

var targz = require('targz');

// compress files into tar.gz archive while filtering all .bin files and having gzip level/memLevel set to 6
targz.compress({
    src: 'path_to_files',
    dest: 'path_to_compressed_file',
    tar: {
        ignore: function(name) {
            return path.extname(name) === '.bin' // ignore .bin files when packing
        }
    },
    gz: {
        level: 6;
        memLevel: 6;
    }
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Done!");
    }
});

```

## License

MIT