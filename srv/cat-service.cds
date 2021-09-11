using {toadslop.bookshop as bookshop} from '../db';

@path : 'browse'
service CatalogService {
  entity Books   as projection on bookshop.Books actions {
    action addReview(rating : bookshop.Rating, title : bookshop.Name, text : bookshop.Text) returns Reviews;
  };

  entity Reviews as projection on bookshop.Reviews;
}
