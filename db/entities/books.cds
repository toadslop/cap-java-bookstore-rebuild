namespace toadslop.bookshop;

using {toadslop.bookshop as bookshop} from './index';
using {
  Currency,
  cuid
} from '@sap/cds/common';

entity Books : cuid {
  title    : bookshop.Name;
  descr    : bookshop.Text;
  author   : bookshop.Name;
  genre    : bookshop.Name;
  rating   : Decimal(2, 1)@assert.range : [
    0.0,
    5.0
  ];
  price    : Decimal(9, 2);
  currency : Currency;
  reviews  : Association to many bookshop.Reviews
               on reviews.book = $self;
}
