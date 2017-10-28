const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {id: 10};

let token = jwt.sign(data, 'h234g12');
console.log('token: ', token);
let decoded = jwt.verify(token, 'h234g12');
console.log('decoded: ', decoded);
// let msg = 'some text line';
// let hash = SHA256(msg).toString();
//
// console.log('msg: ', msg);
// console.log('hash: ', hash);
//
// let data = {
//   id: 4
// };
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let res_hash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(res_hash === token.hash){
//   console.log('data was not changed');
// } else {
//   console.log('data was changed. Do not trust');
// }