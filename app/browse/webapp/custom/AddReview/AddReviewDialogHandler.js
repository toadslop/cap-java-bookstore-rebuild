sap.ui.define(
  [
    "sap/ui/core/Fragment",
    "./createAddReviewFormContainer",
    "sap/ui/model/json/JSONModel",
  ],
  function (Fragment, createAddReviewFormContainer, JSONModel) {
    "use strict";

    const getAddReviewDialog = (oEvent) => oEvent.getSource().getParent();

    const setInputError = (oInputElement, bHasError) => {
      const oFormErrorModel = oInputElement.getModel("formErrors");
      const oInputErrors = { ...oFormErrorModel.getProperty("/inputErrors") };
      oInputErrors[oInputElement.getId()] = bHasError;
      oFormErrorModel.setProperty("/inputErrors", oInputErrors);
    };

    return {
      beforeOpenDialog: function (oEvent, oParams) {
        const oFormErrorModel = new JSONModel({
          get hasErrors() {
            return Object.values(this.inputErrors).some((error) => error);
          },
          inputErrors: {},
        });
        oEvent.getSource().setModel(oFormErrorModel, "formErrors");

        const { sRowBindingPath, sReviewDialogId } = oParams;
        this.sReviewDialogId = sReviewDialogId;
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

      onValidationError: function (oEvent) {
        const oInputElement = oEvent.getParameter("element");
        setInputError(oInputElement, true);
      },

      onValidationSuccess: function (oEvent) {
        const oInputElement = oEvent.getParameter("element");
        setInputError(oInputElement, false);
      },
    };
  }
);
