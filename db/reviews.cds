namespace toadslop.bookshop;

using {toadslop.bookshop as bookshop} from './index';
using {
    cuid,
    managed
} from '@sap/cds/common';

entity Reviews : cuid, managed {
    book   : Association to bookshop.Books;
    rating : bookshop.Rating @assert.range;
    title  : String(100)     @mandatory;
    text   : String(1000)    @mandatory;
}
