//Veloce Cordova Plugin


var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');


var VeloceePlugin = function() {
};

VeloceePlugin.start = function(key) {
  exec(
    successHandler, 
    errorHandler, 
    "VeloceeCDVPlugin", 
    "start", 
    [key]
  );
};

VeloceePlugin.openPlayer = function(source, url) {
  exec(
    successHandler, 
    errorHandler, 
    "VeloceeCDVPlugin", 
    "openAudioPlayer", 
    [source, url]
  );
};

VeloceePlugin.configureBackgroundFetch = function() {
  var Fetcher = window.plugins.backgroundFetch;      
  // Your background-fetch handler.
  var fetchCallback = function() {
    console.log('BackgroundFetch initiated');
    exec(
      backgroundFetchCompletion, 
      errorHandler, 
      "VeloceeCDVPlugin", 
      "startBackgroundFetch", 
      []
      );
  }
        
  Fetcher.configure(fetchCallback);
}

function backgroundFetchCompletion(result) {
  var Fetcher = window.plugins.backgroundFetch; 
  console.log("Velocee background fetch completion:"+result);
  Fetcher.finish();
}

function successHandler(success) {
  console.log("Velocee Plugin OK: " + success);
}

function errorHandler(error) {
  console.error("Velocee Plugin Error: " + error);
}


module.exports = VeloceePlugin;