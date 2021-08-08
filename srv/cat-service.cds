using {toadslop.bookshop as bookshop} from '../db';

@path : 'browse'
service CatalogService {
  entity Books   as projection on bookshop.Books actions {
    action addReview(rating : Integer, title : String, text : String) returns Reviews;
  };

  entity Reviews as projection on bookshop.Reviews;
}
