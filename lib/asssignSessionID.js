module.exports = function(request, file) {
  if (request.session.sessIdentity == undefined) {
    request.session.sessIdFirstAssign = file.replace(process.cwd(), '');
    request.session.sessIdentity = request.session.id;
  }
  console.log(`${file.replace(process.cwd(), '')}'s session ID: ${request.session.sessIdentity}\n(ID was assigned in: ${request.session.sessIdFirstAssign.replace(process.cwd(), '')})\n`);
};
