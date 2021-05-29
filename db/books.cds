namespace toadslop.bookshop;

entity Books {
  key id : Integer;
  title  : String(100);
  descr  : String(1000);
  author : String(100);
  genre  : String(100);
}
