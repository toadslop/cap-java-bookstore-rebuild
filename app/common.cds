using {toadslop.bookshop as bookshop} from '../db/index';

annotate bookshop.Books with {
  author   @title : 'Author';
  genre    @title : 'Genre';
  price    @title : 'Price';
  title    @title : 'Title';
  descr    @title : 'Description';
  currency @UI.Hidden;
  id       @UI.Hidden;
}
