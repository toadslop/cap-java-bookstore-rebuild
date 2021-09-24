sap.ui.define([], function () {
  "use strict";

  return {
    submit: function (oEvent) {
      getAddReviewDialog(oEvent).close();
    },

    cancel: function (oEvent) {
      getAddReviewDialog(oEvent).close();
    },
  };
});
