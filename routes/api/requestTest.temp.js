const querystring = require('querystring');
const http = require('http');
const random = require('random-world');

// ========================================
// ========== POST TEST #1 ================
// ========================================
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
// ======= POST test successful, it returns: =======
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

// ========================================
// ========== PATCH TEST #1 ===============
// ========================================
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

// ========================================
// ========== LIST TEST #X ===============
// ========================================

let optsListGet = {
  hostname: 'localhost',
  port: '3000',
  path: '/api/users',
  method: 'GET',
  headers: {}
};

let reqList = http.request(optsListGet, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.\n');
  });
});

reqList.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

reqList.end();

/*
// ========================================
// ========== PATCH TEST #2 ===============
// ========================================

const patchData = querystring.stringify({
  "name": "Nekdo",
  "first": "Nekdo",
  "last": "Neco",
  "email": "markusuv@email.cz",
  "pass": "hovnoKleslo",
  "permissionLevel": "2"
});

const optsPa = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/5caab33e6efc584e68dc3e3a',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(patchData)
  }
};

const req = http.request(optsPa, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.\n');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(patchData);
req.end();
*/

// ======= PATCH test successful, user is patched and the test returns: =======
// STATUS: 204
// HEADERS: {
//   "x-powered-by": "Express",
//   "etag": "W/\"2-vyGp6PvFo4RvsFtPoIWeCReyIC8\"",
//   "date": "Sat, 08 Jun 2019 20:42:33 GMT",
//   "connection": "close"
// }
// No more data in response.


// ========================================
// ========== DELTE TEST #1 ===============
// ========================================
/*
const optsDelete = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/5c884388eda71b270317183f', // aka {"repo":"Public","_id":"5c884388eda71b270317183f","name":"alyson","first":"Alyson","last":"Guthrie","email":"chaemontalvo@sign.org","pass":"rvDkvd8H9fcxvyVj","user_cookie_id":"cSOBkKg3dBH4CpaJ","last_logged":"2017-07-23T15:26:27.211Z","__v":0}
  method: 'DELETE'
};

const reqDelete = http.request(optsDelete, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('\n' + res.rawHeaders);
    console.log('No more data in response.\n');
  });
});

reqDelete.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

reqDelete.end();
*/

// ======= DELETE test successful, user is removed and the test returns: =======
// STATUS: 204
// HEADERS: {
//   "x-powered-by": "Express",
//   "etag": "W/\"2-vyGp6PvFo4RvsFtPoIWeCReyIC8\"",
//   "date": "Sat, 08 Jun 2019 20:54:49 GMT",
//   "connection": "close"
// }

// X - Powered - By, Express, ETag, W / "2-vyGp6PvFo4RvsFtPoIWeCReyIC8", Date, Sat, 08 Jun 2019 20: 54: 49 GMT, Connection, close
// No more data in response.
