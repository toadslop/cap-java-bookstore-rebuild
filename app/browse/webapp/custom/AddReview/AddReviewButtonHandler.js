sap.ui.define(["sap/ui/core/Fragment"], function (Fragment) {
  "use strict";

  return {
    openDialog: async function () {
      const oBooklistPage = sap.ui.getCore().byId("bookshop::BooksList");
      console.log("OPEN DIALOG");
      if (!this.oAddReviewDialog) {
        this.oAddReviewDialog = await Fragment.load({
          id: `${oBooklistPage.getId()}-AddReviewDialog`,
          name: "bookshop.custom.AddReview.AddReviewDialog",
        });
        oBooklistPage.addDependent(this.oAddReviewDialog);
      }

      this.oAddReviewDialog.open();
    },
  };
});
