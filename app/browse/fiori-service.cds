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
}) {
  @UI.HiddenFilter
  descr;
  @Measures.ISOCurrency : currency.code
  price;
};

annotate CatalogService.Books actions {
  addReview(rating @title : 'Rating', title  @title : 'Title', text  @title : 'Text')
}