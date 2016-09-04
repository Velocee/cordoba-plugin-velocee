package com.velocee.cordova.plugin;

//VeloceeCDVPlugin.java

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import com.velocee.sdk.VlcSDK;

public class VeloceeCDVPlugin extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	if (action.equals("echo")) {
        	String message = args.getString(0);
        	this.echo(message, callbackContext);
        	return true;
    	}
    	else if (action.equals("start")) {
    		String key = args.getString(0);
    		Context context=this.cordova.getActivity().getApplicationContext();
    		VlcSDK.getObj().start(context, key); //MCB FBC
    		return true;
    	}
    	else if (action.equals("openAudioPlayer")) {
    		String sourceName = args.getString(0);
    		String siteUrl = args.getString(1);
    		if ((sourceName!=null)&&(siteUrl!=null)) {
    			VlcSDK.getObj().startAudioExt(sourceName, siteUrl);
    			return true;
    		}
    	}
    	return false;
	}

	private void echo(String message, CallbackContext callbackContext) {
    	if (message != null && message.length() > 0) {
        	callbackContext.success(message);
    	} else {
        	callbackContext.error("Expected one non-empty string argument.");
    	}
	}

	//getActivity()
	//getContext()
}