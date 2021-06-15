namespace toadslop.bookshop;

using {Currency} from '@sap/cds/common';

entity Books {
  key id       : Integer;
      title    : String(100);
      descr    : String(1000);
      author   : String(100);
      genre    : String(100);
      rating   : Decimal(2, 1)@assert.range : [
        0.0,
        5.0
      ];
      price    : Decimal(9, 2);
      currency : Currency;
}
