sap.ui.define([], function () {
  "use strict";

  return {
    notBlank: function (oEvent, oParams) {
      const { isInitial = false, oInput = oEvent.getSource() } = oParams || {};
      const isRequired = oInput.getRequired();

      if (isRequired) {
        const sValue = oInput.getValue();
        if (!sValue) {
          const sFieldLabel = oInput.getParent().getAggregation("label");

          oInput.fireValidationError({
            element: oInput,
            property: isInitial ? null : "value",
            message: isInitial ? null : `${sFieldLabel} field cannot be blank`
          });
        } else {
          oInput.fireValidationSuccess({ element: oInput, property: "value" });
        }
      }
    }
  };
});
