#import "VeloceeCDVPlugin.h"
#import <Cordova/CDVAvailability.h>
#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import "VlcSDK.h"

@implementation VeloceeCDVPlugin

- (void) pluginInitialize {
    NSLog(@"Velocee plugin initialized");
    [self setupBackgroundFetchHandler];
    [self setupBackgroundSessionHandler];
}

- (void)echo:(CDVInvokedUrlCommand *)command {
    NSString* phrase = [command.arguments objectAtIndex:0];
    NSLog(@"%@", phrase);
}

- (void) start:(CDVInvokedUrlCommand *)command {
	CDVPluginResult* pluginResult = nil;
	NSString* key = [command argumentAtIndex:0 withDefault:@"" andClass:[NSString class]];
	if (key != nil) {
      NSLog(@"Velocee SDK Starting");
      dispatch_async(dispatch_get_main_queue(), ^{[[VlcSdk getObj]veloceeStart:key];});
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

/*
- (void) startBackgroundFetch:(CDVInvokedUrlCommand*)command {

    void (^resultHandler)(UIBackgroundFetchResult) = ^(UIBackgroundFetchResult result){
        dispatch_async(dispatch_get_main_queue(), ^{
            //completionHandler(result);
            NSLog(@"result");
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:result];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        });
    };
    
    [[VlcSdk getObj]performFetch:[UIApplication sharedApplication] performFetchWithCompletionHandler: resultHandler];
}
*/

- (void)setupBackgroundFetchHandler
{
    if ([[[UIApplication sharedApplication] delegate] respondsToSelector:@selector(application:performFetchWithCompletionHandler:)]) {
        NSLog(@"Background fetch Method exists do nothing");
    } else {
        class_addMethod([[[UIApplication sharedApplication] delegate] class], @selector(application:performFetchWithCompletionHandler:),
                        class_getMethodImplementation([self class], @selector(application:performFetchWithCompletionHandler:)), nil);
    }
}

- (void)application:(UIApplication*)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler{
    NSLog(@"performFetchWithCompletionHandler");
    [[VlcSdk getObj] performFetch: (UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler];
}

- (void)setupBackgroundSessionHandler
{
    if ([[[UIApplication sharedApplication] delegate] respondsToSelector:@selector(application:handleEventsForBackgroundURLSession:completionHandler:)]) {
        NSLog(@"Background Session Method exists do nothing");
    } else {
        NSLog(@"Setup background session handler");
        class_addMethod([[[UIApplication sharedApplication] delegate] class], @selector(application:handleEventsForBackgroundURLSession:completionHandler:),
                        class_getMethodImplementation([self class],
                                                      @selector(application:handleEventsForBackgroundURLSession:completionHandler:)), nil);
    }
}

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)())completionHandler {
    [[VlcSdk getObj]bgCompleteNotification:completionHandler];
}

@end