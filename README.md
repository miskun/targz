# TarGz for NodeJS

Simple tar.gz compression and decompression for NodeJS.

## Installation

```
npm install targz
```

## Simple Usage

```
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

## License

MIT