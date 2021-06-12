using {toadslop.bookshop as bookshop} from '../db/index';

annotate bookshop.Books with {
  author @title : 'Author';
  genre  @title : 'Genre';
  price  @title : 'Price';
}
