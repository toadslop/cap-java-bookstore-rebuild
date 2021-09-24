sap.ui.define(
  [
    "sap/ui/core/Fragment",
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
  ],
  function (Fragment, FormContainer, FormElement, Input) {
    "use strict";

    const getAddReviewDialog = (oEvent) => oEvent.getSource().getParent();

    const oContainerTemplate = new FormContainer();
    const oTitleElement = new FormElement({ label: "Title" });
    const oTitleInput = new Input({ value: "{title}" });
    oTitleElement.addField(oTitleInput);
    oContainerTemplate.addFormElement(oTitleElement);

    return {
      beforeOpenDialog: function (oEvent, oParams) {
        const { sRowBindingPath, sReviewDialogId } = oParams;
        const oAddReviewForm = Fragment.byId(sReviewDialogId, "addReviewForm");

        oAddReviewForm.bindAggregation("formContainers", {
          path: `${sRowBindingPath}/reviews`,
          template: oContainerTemplate,
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

      submit: function (oEvent) {
        getAddReviewDialog(oEvent).close();
      },

      cancel: function (oEvent) {
        getAddReviewDialog(oEvent).close();
      },
    };
  }
);
