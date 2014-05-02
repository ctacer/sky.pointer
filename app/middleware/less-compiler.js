
//#!/usr/bin/env node

/* Copyright 2012, Jonathan Cheung Licensed and released under the MIT
   license. Refer to MIT-LICENSE.txt.

   A nodejs script that allows you to watch a folder for changes and
   compile the less css files into another folder.

   Always give credit where it's due. Parts of this script is modified
   from Mikeal Rogers's watch script (https://github.com/mikeal/watch)

   Usage:     node less-watch-compiler.js FOLDER_TO_WATCH FOLDER_TO_OUTPUT
   Example:   'node less-watch-compiler.js less css' will watch ./less folder
              and compile the less css files into ./css when they are added/changed
*/
var allowedExtensions = ['less'];
var sys = require('util')
  , fs = require('fs')
  , path = require('path')
  , events = require('events')
  , exec = require('child_process').exec;

// Check to see if we have the correct number of arguments

var sourceDirectory;
var destinationDirectory;

var getFileListSync = function (path) {

  var files = fs.readdirSync(path);
  var stat, filePath;
  var result = [];

  files.forEach(function (file) {

    filePath = path + '/' + file;
    stat = fs.statSync(filePath);

    if (stat.isFile() && isAllowedExtension(getFileExtension(file))) {
      result.push(filePath);
    }
    else if (stat.isDirectory()) {
      result = result.concat(getFileListSync(filePath));
    }
  });

  return result;
};


// String function to retrieve the filename without the extension
function getFilenameWithoutExtention(string){
  //extract filename (xxx.less)
  //strip out the extension
  var filename = string.replace(/^.*[\\\/]/, '').split('.')[0];
  return filename
}

function getRelativeFilePath(string) {
  var fileName = getFilenameWithoutExtention(string) + "." + getFileExtension(string);
  var filePath = string.replace(sourceDirectory, '');
  filePath = filePath.replace(fileName, '');
  if (filePath[0] == '/') {
    filePath = filePath.substr(1);
  }
  return filePath;
}

// String function to retrieve the file's extension
function getFileExtension(string){
  var extension = string.split('.').pop();

  if (extension == string) 
    return '';
  else
    return extension;
}

function isAllowedExtension (string) {
  return allowedExtensions.indexOf(string) != -1;
}

// Here's where we run the less compiler
function compileCSS(file, cb){
  cb = cb || function () {};

  var filename = getFilenameWithoutExtention(file);
  var command = 'lessc -x '+file.replace(/\s+/g,'\\ ')+' '+destinationDirectory+'/'+getRelativeFilePath(file)+filename.replace(/\s+/g,'\\ ')+'.css';
  // Run the command
  exec(command, function (error, stdout, stderr){
    if (error !== null)
      console.log(error);
    if(stdout)
        console.error(stdout);
    cb();
  });
}

var getRelativeDestinationFolder = function () {
  return destinationDirectory.replace('../', '').replace('./', '').replace('/', '\\');
};

var clearDestinationFolder = function (cb) {
  cb = cb || function () {};

  var clearPath = getRelativeDestinationFolder();
  exec('rd /s /q ' + clearPath, function() { 
    exec('md ' + clearPath, function () {
      cb();
    });
  });
};

var argvs = process.argv.slice(2);
if (!argvs[0] || !argvs[1]){
  console.log('Missing arguments. Example:');
  console.log('\tnode less-watch-compiler.js FOLDER_TO_WATCH FOLDER_TO_OUTPUT');
  process.exit(1);
}
else {
  sourceDirectory = argvs[0];
  destinationDirectory = argvs[1];
}

!function () {

  var sourceFiles = getFileListSync(sourceDirectory);

  if (!sourceFiles.length) {
    return;
  }

  (function () {

    var index = 0;

    var compileStep = function () {
      if (index < sourceFiles.length) {
        compileCSS(sourceFiles[index++], compileStep);
      }  
    };

    clearDestinationFolder(compileStep);

  }) ();

} ();