const db = require("../models");
const Fibonacci = db.fibonacci;
const Op = db.Sequelize.Op;

module.exports = {
  calculateFibonacci (req, res) {
    //
    function writeDb (req, res, numberFibonacci, valueFibonacci) {
      let ip = req.ip.replace('::ffff:', '');
      if (ip === '::1') {
        ip = '127.0.0.1'
      }
      const fibonacci = {
        userIp: ip,
        numberFibonacci,
        valueFibonacci,
        timeQuery: new Date()
      };

      Fibonacci.create(fibonacci)
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the query."
          });
        });
    };
    //
    if (req.query.numberFibonacci) {
      let n = parseInt(req.query.numberFibonacci);
      if (n === 0) {
        writeDb(req, res, n, n);
        res.status(200).send({
          numberFibonacci: n,
          valueFibonacci: n
        });
      } else if (n > 0) {
        let a = 1;
        let b = 1;
        for (let i = 3; i <= n; i++) {
          let c = a + b;
          a = b;
          b = c;
        }
        writeDb(req, res, n, b);
        res.status(200).send({
          numberFibonacci: n,
          valueFibonacci: b
        });
      } else {
        res.status(500).send({
          message: "Fibonacci number cannot be negative."
        });
      }
    } else {
      res.status(500).send({
        message: "Invalid request"
      });
    }
  },

  findAll (req, res) {
    let ip = req.ip.replace('::ffff:', '');
    if (ip === '::1') {
      ip = '127.0.0.1'
    }
    const condition = { userIp: { [Op.like]: `%${ip}%` } };

    Fibonacci.findAll({ where: condition })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving queries."
        });
      });
  }
}
