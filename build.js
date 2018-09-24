#! /usr/bin/env node

/*
 * Required dependancies
 */
const fse = require('fs-extra');
const {RamlJsonGenerator} = require('raml-json-enhance-node');

/*
 * Configure api-console builder
 */
const args = process.argv.slice(2);
const source = (args.length >= 1) ? args[0] : "api-source";
const destination = (args.length >= 2) ? args[1] : "api-console-build";
const mainFile = (args.length >= 3) ? args[2] : "api.raml";
const seperator = (args.length >= 4) ? args[3] : "/";
const tempSource = 'temp-api-source';
const tempDestination = 'temp-api-console-build';
const enhancer =  new RamlJsonGenerator(tempSource + seperator + mainFile);

/*
 * Remove temporary directories.
 */
function removeTempDirectories() {
  console.log('Removing temporary working directories')
  fse.removeSync(tempSource)
  console.log(' - Successfully removed directory', tempSource)
  fse.removeSync(tempDestination)
  console.log(' - Successfully removed directory', tempDestination)
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
.then((json) => {
  console.log(json);
});
.then(function() {
  console.log(' - API Console build complete')

  /*
   * Move the output to from the temporary
   * directory to the required destination.
   */
  console.log('Moving API console to destination directory')
  fse.moveSync(tempDestination, destination, { overwrite: true })
  console.log(' - Successfully moved directory from', tempDestination, 'to', destination)

  removeTempDirectories()
})
.catch(function(cause) {
  console.log(' - API Console build error', cause.message)

  removeTempDirectories()
})
