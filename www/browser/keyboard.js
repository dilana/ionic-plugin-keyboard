
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    channel = require('cordova/channel');


var Keyboard = function() {
};

Keyboard.hideKeyboardAccessoryBar = function(hide) {
    return null;
};

Keyboard.close = function() {
    return null;
};

Keyboard.show = function() {
    return null;
};

Keyboard.disableScroll = function(disable) {
    return null;
};

/*
Keyboard.styleDark = function(dark) {
 exec(null, null, "Keyboard", "styleDark", [dark]);
};
*/

Keyboard.isVisible = false;

channel.onCordovaReady.subscribe(function() {
    exec(success, null, 'Keyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if ( action === 'S' ) {
            var keyboardHeight = msg.substr(1);
            cordova.plugins.Keyboard.isVisible = true;
            cordova.fireWindowEvent('native.keyboardshow', { 'keyboardHeight': + keyboardHeight });

            //deprecated
            cordova.fireWindowEvent('native.showkeyboard', { 'keyboardHeight': + keyboardHeight });
        } else if ( action === 'H' ) {
            cordova.plugins.Keyboard.isVisible = false;
            cordova.fireWindowEvent('native.keyboardhide');

            //deprecated
            cordova.fireWindowEvent('native.hidekeyboard');
        }
    }
});

module.exports = Keyboard;
