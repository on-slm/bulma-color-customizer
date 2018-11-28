module.exports = function(request, file) {
  if (request.session.sessIdentity == undefined) {
    request.session.sessIdFirstAssign = file.replace(process.cwd(), '');

    // express-session's DEFAULT works like this:
    // Assigns 32 random bytes (viz module random-bytes) via module uid-safe (uid.sync(24))
    // Viz readme.md: "to create a UID of length 24, you want a byte length of 18."
    // (to create a UID of length 32, you want a byte length 24...)
    request.session.sessIdentity = request.session.id;

    // MongoDB DEFAULT _id's work like this:
    // mongoose.Types.ObjectId().valueOf() returns a new ObjectId value as a hexadecimal string.
    // The 12-byte ObjectId value consists of a 4-byte value representing the secs since the epoch +
    // + a 5-byte random value + a 3-byte counter

    // CONCLUSION: 12-bytes must be enough for me. So instead of 32 bytes of req.session.id/req.sessionID
    // I'll somehow use a value of the given Mongo ObjectId.
    // Probably via this function from the express-session's object options:
    // https://www.npmjs.com/package/express-session#genid
  }
  console.log(`${file.replace(process.cwd(), '')}'s session ID: ${request.session.sessIdentity}\n(ID was assigned in: ${request.session.sessIdFirstAssign.replace(process.cwd(), '')})\n`);
};


/* HOW DID I FIND THAT:
  var x = 'K5FIkJwXalaej84CFrm6qNImvIab5gWf'
  console.log(uid(24));
  console.log(uid(24));
  console.log(uid(24));
  var y = mongoose.Types.ObjectId().valueOf();

  console.log(x);
  console.log(y);
  console.log(Buffer.from('' + x, 'utf8').length);
  console.log(Buffer.from('' + y, 'hex').length);
  console.log(Buffer.byteLength(Buffer.from('' + x, 'utf8')));
  console.log(Buffer.byteLength(Buffer.from('' + y, 'hex')));
  console.log(Buffer.from('' + x, 'utf8').toString('hex'));
  console.log(Buffer.from('' + mongoose.Types.ObjectId().valueOf(), 'hex').toString('utf8'));

  console.log(Buffer.from('' + x, 'base64'));
  console.log(Buffer.from('' + x, 'base64').toString('hex'));
*/
