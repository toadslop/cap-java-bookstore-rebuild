sap.ui.define(
  ["sap/ui/core/Fragment", "./createAddReviewFormContainer"],
  function (Fragment, createAddReviewFormContainer) {
    "use strict";

    const getAddReviewDialog = (oEvent) => oEvent.getSource().getParent();

    return {
      beforeOpenDialog: function (oEvent, oParams) {
        const { sRowBindingPath, sReviewDialogId } = oParams;
        const oAddReviewForm = Fragment.byId(sReviewDialogId, "addReviewForm");
        oAddReviewForm.bindAggregation("formContainers", {
          path: `${sRowBindingPath}/reviews`,
          template: createAddReviewFormContainer(),
          length: 1,
          parameters: {
            $$updateGroupId: "reviews",
          },
        });

        const oReviewBinding = oAddReviewForm.getBinding("formContainers");
        oReviewBinding.create({
          rating: 0,
          title: "",
          text: "",
        });
      },

      submit: async function (oEvent) {
        const oAddReviewDialog = getAddReviewDialog(oEvent);
        oAddReviewDialog.setBusy(true);

        try {
          await oAddReviewDialog.getModel().submitBatch("reviews");
          console.log("SUCCESS");
          oAddReviewDialog.close();
        } catch (error) {
          console.log(`ERROR: ${error.message}`);
        } finally {
          oAddReviewDialog.setBusy(false);
        }
      },

      cancel: function (oEvent) {
        getAddReviewDialog(oEvent).close();
      },
    };
  }
);
