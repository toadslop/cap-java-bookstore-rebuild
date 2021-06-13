using CatalogService from '../../srv/cat-service';

annotate CatalogService.Books with @(UI : {
  HeaderInfo          : {
    TypeName       : 'Book',
    TypeNamePlural : 'Books',
  },
  LineItem            : [
    {Value : title},
    {Value : author},
    {Value : genre},
    {Value : price},
    {
      Value : descr,
      ![@UI.Hidden]
    }
  ],
  SelectionFields     : [
    author,
    genre
  ],
  PresentationVariant : {
    Text           : 'Default',
    SortOrder      : [{Property : title}],
    Visualizations : ['@UI.LineItem']
  },
}) {
  @UI.HiddenFilter
  descr;
  @Measures.ISOCurrency : currency.code
  price;
};
