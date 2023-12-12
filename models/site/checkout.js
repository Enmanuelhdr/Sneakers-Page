const { DataTypes } = require("sequelize");
const connection = require("../../context/appContext");

const Checkout = connection.define("checkout", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  size: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Checkout;
