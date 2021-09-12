using CatalogService from '../../srv/cat-service';

annotate CatalogService.Books with @(UI : {
  HeaderInfo            : {
    TypeName       : 'Book',
    TypeNamePlural : 'Books',
  },
  LineItem              : [
    {Value : title},
    {Value : author},
    {Value : genre},
    {
      $Type  : 'UI.DataFieldForAnnotation',
      Target : '@UI.DataPoint#rating',
      Label  : '{i18n>Rating}'
    },
    {Value : price},
    {
      Value : descr,
      ![@UI.Hidden]
    }
  ],
  SelectionFields       : [
    author,
    genre
  ],
  PresentationVariant   : {
    Text           : 'Default',
    SortOrder      : [{Property : title}],
    Visualizations : ['@UI.LineItem']
  },
  DataPoint #rating     : {
    Value         : rating,
    Visualization : #Rating,
    TargetValue   : 5
  },
  FieldGroup #AddReview : {Data : [{
    $Type              : 'UI.DataFieldForAction',
    Label              : 'Add Review',
    Action             : 'CatalogService.addReview',
    InvocationGrouping : #ISOLATED,
  }]}
}) {
  @UI.HiddenFilter
  descr;
  @Measures.ISOCurrency : currency.code
  price;
};
