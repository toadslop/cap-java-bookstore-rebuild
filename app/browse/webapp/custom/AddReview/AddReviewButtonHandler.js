sap.ui.define(
  ["sap/ui/core/Fragment", "./AddReviewDialogHandler"],
  function (Fragment, AddReviewDialogHandler) {
    "use strict";

    return {
      openDialog: async function (oEvent) {
        const sRowBindingPath = oEvent
          .getSource()
          .getParent()
          .getParent()
          .getBindingContextPath();

        const oBooklistPage = sap.ui.getCore().byId("bookshop::BooksList");

        if (!this.oAddReviewDialog) {
          this.sReviewDialogId = `${oBooklistPage.getId()}-AddReviewDialog`;
          this.oAddReviewDialog = await Fragment.load({
            id: this.sReviewDialogId,
            name: "bookshop.custom.AddReview.AddReviewDialog",
          });
          oBooklistPage.addDependent(this.oAddReviewDialog);
        }

        const oParams = {
          sRowBindingPath,
          sReviewDialogId: this.sReviewDialogId,
        };

        this.oAddReviewDialog.attachBeforeOpen(
          oParams,
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
