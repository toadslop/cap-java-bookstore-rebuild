sap.ui.define(["sap/m/MessageBox"], function(MessageBox) {
    "use strict";
 
    return {
        buttonPressed: function() {
            MessageBox.show("Button pressed!");
        }
    };
});