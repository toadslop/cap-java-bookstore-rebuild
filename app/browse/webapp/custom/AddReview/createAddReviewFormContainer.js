sap.ui.define(
  [
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/RatingIndicator",
    "sap/m/TextArea",
    "../annotations",
    "../validators"
  ],
  function (
    FormContainer,
    FormElement,
    Input,
    RatingIndicator,
    TextArea,
    annotations,
    validators
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

    const attachInitialValidation = (oEvent) => {
      const oInput = oEvent.getSource();
      const requiredBinding = oInput.getBinding("required");
      if (requiredBinding) {
        requiredBinding.detachChange(validators.notBlank);
        requiredBinding.attachChange({ oInput, isInitial: true }, validators.notBlank);
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

      oTitleInput.attachModelContextChange(attachInitialValidation);
      oTitleInput.attachLiveChange(validators.notBlank);
      oTitleInput.attachChange(validators.notBlank);

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

      oComentInput.attachModelContextChange(attachInitialValidation);
      oComentInput.attachLiveChange(validators.notBlank);
      oComentInput.attachChange(validators.notBlank);

      oComentElement.addField(oComentInput);

      return oComentElement;
    };

    return () => {
      const oContainerTemplate = new FormContainer();
      const oTitleElement = createTitleElement();
      const oRatingElement = createRatingElement();
      const oComentElement = createCommentElement();

      oContainerTemplate.addFormElement(oTitleElement);
      oContainerTemplate.addFormElement(oRatingElement);
      oContainerTemplate.addFormElement(oComentElement);
      return oContainerTemplate;
    };
  }
);
