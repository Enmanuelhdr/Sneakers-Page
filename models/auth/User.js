const { DataTypes } = require("sequelize");
const sequelize = require("../../context/appContext");

const User = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    dateOfBirth:{
        type:DataTypes.DATE,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        indexes:[{unique:true}]
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    gender:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
    },



    
    //  imagePath:{
    //     type:DataTypes.STRING,
    //     allowNull:true,
    // }
    // isActive:{
    //     type:DataTypes.BOOLEAN,
    //     defaultValue: false,
    // },
    // token:{
    //     type:DataTypes.STRING,
    //     allowNull:true
    // },
    // tokenExpiration:{
    //     type:DataTypes.DATE,
    //     allowNull:true
    // }
});

module.exports = User;