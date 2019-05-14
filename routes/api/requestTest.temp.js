const querystring = require('querystring');
const http = require('http');
const random = require('random-world');

/*
const postData = querystring.stringify({
  "name": "Sunka",
  "first": "Pepa",
  "last": "Lopata",
  "email": "peplop@gmail.com",
  "pass": "bleskokot",
  "user_cookie_id": "" + random.random(),
  "permissionLevel": "1"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
*/
// test successful, it returns:
/*
STATUS: 201
HEADERS: {
  "x-powered-by": "Express",
  "content-type": "application/json; charset=utf-8",
  "content-length": "33",
  "etag": "W/\"21-oRoUC76VLQku04gbxoiUbvUMTWo\"",
  "date": "Mon, 15 Apr 2019 22:30:51 GMT",
  "connection": "close"
}
BODY: {
  "id": "5cb5061bd058d85656df877f"
}
No more data in response.
*/

// ================================
// ========== PATCH ===============
// ================================
/*
const patchData = querystring.stringify({
  "name": "onslm",
  "pass": "hovnoKleslo",
  "permissionLevel": "2"
});

const opts = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/5cdb2ed8d964b9391c3b4f4b',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(patchData)
  }
};

const req = http.request(opts, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(patchData);
req.end();


*/
// ================================
// ========== PATCH ===============
// ================================

const patchData = querystring.stringify({
  "name": "onslm",
  "pass": "hovnoKleslo",
  "permissionLevel": "2"
});

const opts = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/5c884389eda71b2703171841',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(patchData)
  }
};

const req = http.request(opts, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(patchData);
req.end();
