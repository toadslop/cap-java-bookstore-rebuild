using CatalogService from '../../srv/cat-service';

annotate CatalogService.Books with @(UI : {
  HeaderInfo          : {
    TypeName       : 'Book',
    TypeNamePlural : 'Books',
  },
  LineItem            : [
    {
      Value : title,
      Label : 'Title'
    },
    {Value : author},
    {Value : genre},
    {
      Value : descr,
      ![@UI.Hidden]
    },
    {
      Value : id,
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
});
