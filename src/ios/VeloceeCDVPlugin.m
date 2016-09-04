#import "VeloceeCDVPlugin.h"

#import <Cordova/CDVAvailability.h>
#import "VlcSDK.h"

@implementation VeloceeCDVPlugin

- (void) pluginInitialize {
	NSLog(@"Velocee plugin initialized");
}

- (void)echo:(CDVInvokedUrlCommand *)command {
  NSString* phrase = [command.arguments objectAtIndex:0];
  NSLog(@"%@", phrase);
}

- (void) start:(CDVInvokedUrlCommand *)command {
	CDVPluginResult* pluginResult = nil;
	NSString* key = [command argumentAtIndex:0 withDefault:@"" andClass:[NSString class]];
	if (key != nil) {
		[[VlcSdk getObj]veloceeStart:key];
    	pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"SDK Started"];
  	} else {
    	pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Please set source and url!"];
  	}
  	[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
	//[[VlcSdk getObj]veloceeStart:@"aa2ef3e5-ea78-4706-877c-64f84e1b3743"]; //Maccabi FBC
}

- (void)openAudioPlayer:(CDVInvokedUrlCommand*)command
{
  CDVPluginResult* pluginResult = nil;
  NSString* source = [command argumentAtIndex:0 withDefault:@"Source" andClass:[NSString class]];
  NSString* url = [command argumentAtIndex:0 withDefault:@"" andClass:[NSString class]];
  
  UIViewController *playerVC = [[VlcSdk getObj]getPLayerViewControllerWithSourceName:@"TEST Cordova" andSiteUrl:@"http://www.velocee.com"];
  [self.viewController presentViewController:playerVC animated:NO completion:nil];

  if (source != nil && url != nil) {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Player Opened"];
  } else {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Please set source and url!"];
  }

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) openAudioPlayer
{
	UIViewController *playerVC = [[VlcSdk getObj]getPLayerViewControllerWithSourceName:@"TEST Cordova" andSiteUrl:@"http://www.velocee.com"];
	[self.viewController presentViewController:playerVC animated:NO completion:nil];
}

- (void) setFloatingButton:(CDVInvokedUrlCommand*)command {
	CDVPluginResult* pluginResult = nil;
	UIButton *floating_button = [[VlcSdk getObj]getAudioButton];
    [floating_button addTarget:self action:@selector(onAudioButton) forControlEvents:UIControlEventTouchUpInside];
    [self.viewController.view addSubview:floating_button];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Button Added"];
	[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) onAudioButton {
	[self openAudioPlayer];
}

@end