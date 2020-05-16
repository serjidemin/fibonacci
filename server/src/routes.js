const UserQueryController = require('./controllers/UserQueryConroller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('hello from fibonacci server')
  });

  app.get('/queries',
    UserQueryController.findAll);

  app.get('/calculate',
    UserQueryController.calculateFibonacci);
}
