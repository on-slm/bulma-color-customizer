const User = require('../../models/user');
const crypto = require('crypto');

// export async
function getUserCredentialsByEmail(email) {
  console.log(`post request with user email: ${email}\n`)
  return new Promise((resolve, reject) => {
    try {
      User
        .find({ 'email': email })
        .exec(function (err, user) {
          try {
            console.log(user);
            user.path('email').validate.resolve(user);
          } catch(err) {
            return reject(err);
          }
        });
    } catch(err) {
      console.error(err);
      return reject(err);
    }
  });
}

exports.isPasswordMatchedUser = async function isPasswordMatchedUser(req, res, next) {
  getUserCredentialsByEmail(req.body.email)
    .then((user) => {
      console.log(user);
      if (!user[0]) {
        res.status(404).send({});
      } else {
        let passFields = user.pass.split('$');
        console.log('password field 1st (aka salt): ' + passFields[0]);
        console.log('password field 2st (aka salt): ' + passFields[1]);
        let salt = passFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.body.pass).digest('base64');
        console.log('hash: ' + hash);
        if (hash === passFields[1]) {
          req.body = {
            userId: user[0]._id,
            email: user[0].email,
            permissionLevel: user[0].permissionLevel,
            provider: 'email',
            name: user[0].name
          };
          return next();
        } else {
          return res.status(400).send({ errors: ['Invalid email or password'] });
        }
      }
    });
}
