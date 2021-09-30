sap.ui.define(
  [
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/RatingIndicator",
    "sap/m/TextArea",
    "../annotations",
  ],
  function (
    FormContainer,
    FormElement,
    Input,
    RatingIndicator,
    TextArea,
    annotations
  ) {
    "use strict";

    const isMandatory = (annotation) => annotation === annotations.mandatory;

    const validateMinMax = (max, min) => {
      if (max && min !== 0) {
        throw new Error(
          `Expected the rating field to have a minimum value of 0 but instead got ${min}`
        );
      }

      return max || 5;
    };

    const attachBindingChange = (oEvent) => {
      const oInput = sap.ui.getCore().byId(oEvent.getParameter("id"));
      const requiredBinding = oInput.getBinding("required");
      if (requiredBinding) {
        requiredBinding.attachChange({ oInput }, fireValidationIfRequired);
      }
    };

    const fireValidationIfRequired = (oEvent, { oInput }) => {
      const inputRequired = oInput.getRequired();
      if (inputRequired) {
        const sValue = oInput.getValue();
        if (!sValue) {
          oInput.fireValidationError({ element: oInput });
        }
      }
    };

    const executeRequiredValidation = (oEvent) => {
      const oInput = oEvent.getSource();
      const isRequired = oInput.getRequired();

      if (isRequired) {
        const sValue = oInput.getValue();
        if (!sValue) {
          const sFieldLabel = oInput.getParent().getAggregation("label");
          oInput.fireValidationError({
            element: oInput,
            property: "value",
            message: `${sFieldLabel} field cannot be blank`,
          });
        } else {
          oInput.fireValidationSuccess({ element: oInput, property: "value" });
        }
      }
    };

    const createTitleElement = () => {
      const oTitleElement = new FormElement({ label: "Title" });
      const oTitleInput = new Input({
        value: "{title}",
        required: {
          path: `title##${annotations.fieldControl}/$EnumMember`,
          formatter: isMandatory,
        },
      });

      oTitleInput.attachModelContextChange(attachBindingChange);
      oTitleInput.attachLiveChange(executeRequiredValidation);
      oTitleInput.attachChange(executeRequiredValidation);

      oTitleElement.addField(oTitleInput);

      return oTitleElement;
    };

    const createRatingElement = () => {
      const oRatingElement = new FormElement({ label: "Rating" });
      const oRatingInput = new RatingIndicator({
        value: "{rating}",
        maxValue: {
          parts: [
            { path: `rating##${annotations.maximum}` },
            { path: `rating##${annotations.minimum}` },
          ],

          formatter: validateMinMax,
        },
      });
      oRatingElement.addField(oRatingInput);

      return oRatingElement;
    };

    const createCommentElement = () => {
      const oComentElement = new FormElement({ label: "Comment" });
      const oComentInput = new TextArea({
        value: "{text}",
        required: {
          path: `text##${annotations.fieldControl}/$EnumMember`,
          formatter: isMandatory,
        },
      });

      oComentInput.attachModelContextChange(attachBindingChange);
      oComentInput.attachLiveChange(executeRequiredValidation);
      oComentInput.attachChange(executeRequiredValidation);

      oComentElement.addField(oComentInput);

      return oComentElement;
    };

    return (oMetadata) => {
      const oContainerTemplate = new FormContainer();
      const oTitleElement = createTitleElement(oMetadata);
      const oRatingElement = createRatingElement(oMetadata);
      const oComentElement = createCommentElement(oMetadata);

      oContainerTemplate.addFormElement(oTitleElement);
      oContainerTemplate.addFormElement(oRatingElement);
      oContainerTemplate.addFormElement(oComentElement);
      return oContainerTemplate;
    };
  }
);
