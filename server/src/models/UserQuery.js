module.exports = (sequelize, DataTypes) => {
  const UserQuery = sequelize.define("fibonacci", {
    userIp: {
      type: DataTypes.STRING
    },
    numberFibonacci: {
      type: DataTypes.INTEGER
    },
    valueFibonacci: {
      type: DataTypes.INTEGER
    },
    timeQuery: {
      type: DataTypes.DATE
    },

  },
    {
      tableName: 'fibonacci',
      timestamps: false
    });

  return UserQuery;
};
