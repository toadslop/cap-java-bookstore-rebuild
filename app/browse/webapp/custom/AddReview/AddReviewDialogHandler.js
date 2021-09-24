sap.ui.define([], function () {
  "use strict";

  const getAddReviewDialog = (oEvent) => oEvent.getSource().getParent();

  return {
    beforeOpenDialog: function (oEvent, oParams) {
      console.log("BEFORE OPEN RAN");
      console.log("PARAMS", oParams);
    },

    submit: function (oEvent) {
      getAddReviewDialog(oEvent).close();
    },

    cancel: function (oEvent) {
      getAddReviewDialog(oEvent).close();
    },
  };
});
