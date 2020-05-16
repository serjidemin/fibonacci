module.exports ={
  port: 4000,
  db: {
    HOST: 'your Mysql db address',
    USER: 'root',
    PASSWORD: 'your password',
    DB: 'your DB name',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
