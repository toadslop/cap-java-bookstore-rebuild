using CatalogService from '../../srv/cat-service';

annotate CatalogService.Books with @(UI : {HeaderInfo : {
  TypeName       : 'Book',
  TypeNamePlural : 'Books',
}});
