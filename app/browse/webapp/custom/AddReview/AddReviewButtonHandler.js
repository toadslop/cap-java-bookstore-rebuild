sap.ui.define(
  ["sap/ui/core/Fragment", "./AddReviewDialogHandler"],
  function (Fragment, AddReviewDialogHandler) {
    "use strict";

    return {
      openDialog: async function () {
        const oBooklistPage = sap.ui.getCore().byId("bookshop::BooksList");

        if (!this.oAddReviewDialog) {
          this.oAddReviewDialog = await Fragment.load({
            id: `${oBooklistPage.getId()}-AddReviewDialog`,
            name: "bookshop.custom.AddReview.AddReviewDialog",
          });
          oBooklistPage.addDependent(this.oAddReviewDialog);
        }

        this.oAddReviewDialog.attachBeforeOpen(
          AddReviewDialogHandler.beforeOpenDialog
        );

        this.oAddReviewDialog.open();

        this.oAddReviewDialog.detachBeforeOpen(
          AddReviewDialogHandler.beforeOpenDialog
        );
      },
    };
  }
);
