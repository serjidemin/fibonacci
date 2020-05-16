const UserQueryController = require('./controllers/UserQueryConroller');

module.exports = (app) => {
  app.get('/queries',
    UserQueryController.findAll);

  app.get('/calculate',
    UserQueryController.calculateFibonacci);
}
