'use strict';
 
var app = require('app');
var BrowserWindow = require('browser-window');
var client = require('electron-connect').client;
var ipc = require('ipc');

console.log( 'eo' );
console.log( 'eo' );

ipc.on('ping', function() {
	console.log( 'eo' );
	//console.log( arguments );
});
 
app.on('ready', function () {
console.log( 'eo' );
  var mainWindow = new BrowserWindow({
    width: 1805,
    height: 934,
	x: 1353,
	y: 501
  });
  //mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.loadUrl('http://127.0.0.1:8080/_buildbundle');

  mainWindow.openDevTools();
 
  // Connect to server process 
  client.create(mainWindow);
});
