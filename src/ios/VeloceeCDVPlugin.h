#import <Cordova/CDVPlugin.h>

@interface VeloceeCDVPlugin : CDVPlugin {
}

// The handler for the 'echo' action
- (void) start:(CDVInvokedUrlCommand *)command;
//- (void)echo:(CDVInvokedUrlCommand *)command;
- (void)openAudioPlayer:(CDVInvokedUrlCommand*)command;
- (void) setFloatingButton:(CDVInvokedUrlCommand*)command;

@end