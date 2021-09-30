namespace toadslop.bookshop;

type Rating : Integer @assert.range : [
    0,
    5
];
