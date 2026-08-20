const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Chat', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'chat',
    timestamps: true
  })
}
