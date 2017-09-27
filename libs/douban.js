const request = require('request');
const url = 'https://api.douban.com/v2';

function req(api, method, data) {
  return new Promise((resolve, reject) => {
    request({
      method, data,
      uri: `${url}${api}`
    }, (err, res, body) => {
      if (err) return reject(err);
      resolve(body);
    });
  });
}

async function isbn(name) {
  return await req(`/book/isbn/${name}`, 'GET');
}

module.exports = {
  isbn
};
