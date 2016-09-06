#Velocee SDK Plugin for Cordova

This plugin provides and javascript interface to the Velocee SDK.

#Integration

Add the plugin to your Cordova or Phonegap project

phonegap plugin add https://github.com/Velocee/cordova-plugin-velocee.git

In your index.html start the sdk in the device ready event calling the start method:

`VeloceeCDVPlugin.start(sdk_key)`

Where sdk_key is the key we provide

The SDK provides a floating button that shows on the screen at the bottom left corner and activated the player when pressed.

To use the SDK button call the following function after calling start:

`VeloceeCDVPlugin.addFloatingButton(source_name, site_url);`

source_name should be the app name. It apears in the player as the title for the articles.

site_url is your website url and is used when sharing items from the player.

IF you want to setup your own button to activate the player it should call the following method when clicked:

`VeloceeCDVPlugin.openPlayer(source_name, site_url)`
