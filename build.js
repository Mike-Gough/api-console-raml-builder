#! /usr/bin/env node

/*
 * Required dependancies
 */
const fse = require('fs-extra');
const {RamlJsonGenerator} = require('raml-json-enhance-node');

/*
 * Configure raml-json-enhance-node
 */
const args = process.argv.slice(2);
const source = (args.length >= 1) ? args[0] : "api-source";
const destination = (args.length >= 2) ? args[1] : "build";
const mainFile = (args.length >= 3) ? args[2] : "api.raml";
const destFile = (args.length >= 4) ? args[3] : "api.json";
const seperator = (args.length >= 5) ? args[4] : "\\";
const tempSource = './temp-api-source';
const enhancer =  new RamlJsonGenerator(tempSource + seperator + mainFile);

/*
 * Remove temporary directories.
 */
function removeTempDirectories() {
  console.log('Removing temporary working directories')
  fse.removeSync(tempSource)
  console.log(' - Successfully removed directory', tempSource)
}
removeTempDirectories()

/*
 * Create temporary directories.
 */
console.log('Creating temporary working directories')
fse.ensureDirSync(tempSource)
console.log(' - Successfully created source directory', tempSource)

/*
 * Copy source to temporary directory.
 * This is performed because the builder
 * fails if it isn't in a sub directory.
 */
console.log('Copying service contract to a temporary directory')
fse.copySync(source, tempSource)
console.log(' - Successfully copied directory', source, 'to', tempSource)

/*
 * Build RAML
 */
console.log('Building RAML with options')
enhancer.generate()
.then(function(json) {
  console.log(' - RAML build complete')

  /*
   * Save JSON to the required destination.
   */
  fse.createFileSync(destination + seperator + destFile, function(err) {
    console.log(' - Error creating file', err)
  })
  fse.outputJsonSync(destination + seperator + destFile, json, function(err) {
    console.log(' - Error writing JSON', err)
  })

  removeTempDirectories()
})
.catch(function(cause) {
  console.log(' - RAML build error', cause.message)

  removeTempDirectories()
})
