sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
  "use strict";

  return {
    onInit: function () {
      console.log("INIT!");
    },

    onPress: function () {
      MessageBox.show("Button pressed!");
    },
  };
});
