# api-console-raml-builder
This project can be used to automatically generate JSON for an API Console from RAML.

## Usage
1. Install Node
1. Run the build process by calling a node script and providing a source directory, a destination directory, a main RAML file name, a JSON file name and a directory separator:
```
node build.js raml-source-path json-destination-path raml-source-file-name json-destination-file-name file-seperator
```

## Prerequisites
* [Node Package Manager](https://www.npmjs.com/)
* [Node.js](https://nodejs.org)

## Tools Used
* [Node.js: fs-extra](https://github.com/jprichardson/node-fs-extra)
* [RAML JSON Enhance Node](https://github.com/mulesoft-labs/raml-json-enhance-node)
