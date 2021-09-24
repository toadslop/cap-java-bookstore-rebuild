sap.ui.define(
  [
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Input",
    "sap/m/RatingIndicator",
    "sap/m/TextArea",
  ],
  function (FormContainer, FormElement, Input, RatingIndicator, TextArea) {
    "use strict";

    const createTitleElement = () => {
      const oTitleElement = new FormElement({ label: "Title" });
      const oTitleInput = new Input({ value: "{title}" });
      oTitleElement.addField(oTitleInput);

      return oTitleElement;
    };

    const createRatingElement = () => {
      const oRatingElement = new FormElement({ label: "Rating" });
      const oRatingInput = new RatingIndicator({
        value: "{rating}",
        maxValue: 5,
      });
      oRatingElement.addField(oRatingInput);

      return oRatingElement;
    };

    const createCommentElement = () => {
      const oComentElement = new FormElement({ label: "Comment" });
      const oComentInput = new TextArea({
        value: "{text}",
      });
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
