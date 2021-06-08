using CatalogService from '../../srv/cat-service';

annotate CatalogService.Books with @(UI : {
  HeaderInfo : {
    TypeName       : 'Book',
    TypeNamePlural : 'Books',
  },
  LineItem   : [
    {
      Value : title,
      Label : 'Title'
    },
    {
      Value : author,
      Label : 'Author'
    },
    {
      Value : genre,
      Label : 'Genre'
    },
    {
      Value : descr,
      ![@UI.Hidden]
    },
    {
      Value : id,
      ![@UI.Hidden]
    }
  ],
});
