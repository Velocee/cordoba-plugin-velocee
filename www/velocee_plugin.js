//Veloce Cordova Plugin


var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');


var VeloceePlugin = function() {
};

var velocee_speaker_icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFc0lEQVR4nO2aa4hWRRjHf+tqIl6yErQszfoQrZrZhTQKjRCJLMjKKAvDCkwXCZSCpNQsKajWUrt9iAwkNcm8BEEfShPTLlR20T4EGXkpInQ3y0vbvw9nzzrO+8y757zve973bO4fDszznP88M/M/c+bMmZk6SZzK6FbrCtQaXQLUugK1RpcAta5ArdGZBGgAPgOagXXAqEoEretEn8HPgcsdW8DbwHxgd6lBO5MAfwK9DX8r8CSwqC2dCtV8BRqAa4DuJeZ/M+CvJ+oFW4BhqaNKyvqqk9SkE9giqUcJceolPSzpN4VxSNLENHGr0fiXjIreWkbMXpIWSPorIMIRSZPyIsDyQCUbKxD7QkkfB+IfkzQ5SZwsx4BlwMwM4/8IjAeWGvd6AKuBcR0FyUqApcCsCsSpB+4jGuXHGPdbgdlAI9Fn0UV3YBUwqGgJGXT7FwPdspRX4BUv3wZJwwPcBwNlbVY0gFZlDHghQePTCNBs5D0iaXaAPy9Q3sJqCLAkYePTCLC7SIw1Kvyc1knaZHCPSrooSwGaUjQ+jQBjJf1SJM46FYowQNI+g7vRKqMWjZfSfQb7SHpG0vFArNeNPFMD3DE+t9zGP5++7ZJKmwdcKfvJStI9HrdO0naDt86PW07jnyup6RFKnQgNlbTHiNci6TyPO8Hg/dMWo53n/pj0AuYAo9u+v8XQnwSTjBJRB/QDDhn39gA3ADuAPo6/D9FcYZrj+wDYBVzs+OqBqcDido+jxltlPNG0CPWAq3Vi0NspaUqAd78Rs1XSKI/XaPC+djkuOfRzkQVCAuwyuGsk9TS4nxrc1zzO4ED5A2OOOxXuVUa3rRQGG77bgbVEr4aLBQZ3Cie3Yy/wpcEbHyfytib4bMA/CZjr+d4nGhNcnA5M8HwfGvFGx4m8CfAE0R/kEePeY8AAx/4X2GDwxnr2twZnRJzImwAALxM14qDn7wvc6/msp3uVZ1sCDIkTeRQA4Cvsd/xGz/7O4Azx7AMG5+w4kVcBAN4xfCM822rcmZ7dbHDaV5fzLMCvhq+/Zx82OH0TcHrGiTwLMNDwHfRsa5+gJQHnaJzIswCTDZ8/oFnLXX94dj+D094r8irAJUSbHT7e8+wGg/OzZ1s9aX+cyKMAM4DtwBmevwV4w/NdZ+Tf4dn+wAmOSHkTYB7RPMCali8AfnfsbsDNBu8Tzx5pcNpfpbwJ8EjA/y7Q5PkmAud7vmai32AXVi9p/z9wBbCmn9XGXsO3EriDwnV/a4xYA/zt2OfgzPsdfBQnXAHWJ6pitngA2NeW/ga4DbgbOObxplM45RWw3PPdYpSxE2eO4a4ITQe+By6l41ejP9msCG0FziW8IgTRCs8Sw7+SaArtwtqaW32SFViYyPOa4E9GvMPy1vokXW/wWn1eOYPgHAoHpixxBbANGGrcm0Xh2sAig7exgFfik3Cvpox7QG9JTyu8L7DCyHNXgDvW51ZCAJRuWyyNAGNUfGdovQp3hs4K5NlklVEpAVDyjdE0AhTbG1wr6TQjzwaDm/neYHwl2RpPI4C1O3xU0kMB/qOB8qqyOxxfSysowKtevk2SRgS4MwJlbZbUvZoCIGlZhQSoV7QJ8pSMAcy5Zir6xPnYL2lQsTKyEgCFD0ilESCJQKGx57ikcR3FKPXQYhLEZ4SyOih1AbCC6PClj+PAncDmDqNk2ANQducE56v4OcGbksbLWoBYhCangltlf76SdPe5kg4EGi7l8KSoew2XdK2KjMgdXFZPcrFN0rC0cf8vp8UXAwvJ+WnxcvGDZ4to13gk8DglNB46lwDTgC+IFkfXA5cRbZ3vKidoZ3oFMkFn6gGZoEuAWleg1ugSoNYVqDVOeQH+AyiirgMI1KfbAAAAAElFTkSuQmCC";


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

//Add floating button with speaker icon inside
VeloceePlugin.addFloatingButton = function(source, url, rgbacolor) {
    var cssContent = ".vlc_fab_main_btn{"+
            "background-color:#F44336;"+
            "position:fixed;" +
            "bottom:10%;" +
            "left:2%;" +
            "width:60px;"+
            "height:60px;"+
            "border-radius:100%;"+
            "/* background:#F44336; */"+
            "border:none;"+
            "outline:none;"+
            "color:#FFF;"+
            "/* font-size:36px; */"+
            "box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);"+
            "transition:.3s;"+
            "-webkit-tap-highlight-color: rgba(0,0,0,0);"+
            "}/*.vlc_fab_main_btn:focus {"+
            "transform:scale(1.1);"+
            "transform:rotate(45deg);"+
            "-ms-transform: rotate(45deg);"+
            "-webkit-transform: rotate(45deg);}*/";
    
    var style = document.createElement('style');
    style.innerHTML = cssContent;
    document.getElementsByTagName('head')[0].appendChild(style);  
    var btn = document.createElement("BUTTON");     // Create a <button> element
    btn.className = "vlc_fab_main_btn";
    if (rgbacolor){
        btn.style.background = rgbacolor;
    } else {
        btn.style.background = "rgba(255,0,255,0.5)";
    }
    var speaker = "\ud83d\udd0a"
    //var t = document.createTextNode(speaker);       // Create a text node
    //btn.appendChild(t);
    btn.appendChild(createVeloceeAudioImage()); 
    //btn.appendChild(createAudioImage());
    var onClickCall = "VeloceeCDVPlugin.openPlayer('"+source+"','"+url+"')";
    btn.setAttribute("onClick", onClickCall);
    btn.setAttribute("id", "velocee_fb");
    //btn.onclick="openPlayer("+source+","+url+")";
    document.body.appendChild(btn);                    // Append <button> to <body>
}

createVeloceeAudioImage = function() {
    var x = document.createElement("IMG");
    x.src = velocee_speaker_icon;
    //x.src="http://app.velocee.com/pages/icon_volume_up.png";
    x.width = 40;
    x.height = 40;
    x.style = "text-align:center;margin:auto";
    return x;
}

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
  };
        
  Fetcher.configure(fetchCallback);
};

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