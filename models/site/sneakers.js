const { DataTypes } = require("sequelize");
const connection = require("../../context/appContext");

const Sneakers = connection.define("sneakers", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    imagePath:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    model:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    brand:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gender:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    material:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Sneakers;