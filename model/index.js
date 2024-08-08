var Sequelize = require('sequelize'); //sequelize module import
var fs = require("fs"); //fs module import
var path = require("path"); //path module import

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default. development
const config = require("../config/config.json")[env];

//connection instances creation for SQl with sequelize.
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mssql',
//     port: '3306', //-------------> change port here
//     driver: 'tedious',
//     // dialectOptions: {
//     //     instanceName: MSSQLSERVER
//     // },
//     define: {
//         timestamps: false
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },
// })

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        // var model = sequelize.import(path.join(__dirname, file));
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.TBL_User.belongsTo(db.TBL_Role, {
    as: 'role',
    foreignKey: {
        name: 'roleId'
    }
});

db.TBL_Role.hasMany(db.TBL_User, {
    as: 'user',
    foreignKey: {
        name: 'roleId'
    }
});
db.TBL_ProductSupplierMap.belongsTo(db.TBL_Supplier, {
    as: 'supplier',
    foreignKey: {
        name: 'supplierId'
    }
});

db.TBL_Supplier.hasMany(db.TBL_ProductSupplierMap, {
    as: 'productSupplierMap',
    foreignKey: {
        name: 'supplierId'
    }
});
db.TBL_ProductSupplierMap.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductSupplierMap, {
    as: 'productSupplierMap',
    foreignKey: {
        name: 'productId'
    }
});  

db.TBL_Order.belongsTo(db.TBL_Product,{
    as:'product',
    foreignKey:{
        name:'productId'
    }
});
db.TBL_Product.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'productId'
    }
});



db.TBL_Order.belongsTo(db.TBL_Supplier,{
    as:'supplier',
    foreignKey:{
        name:'supplierId'
    }
});
db.TBL_Supplier.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'supplierId'
    }
});



db.TBL_Order.belongsTo(db.TBL_User,{
    as:'user',
    foreignKey:{
        name:'userId'
    }
});
db.TBL_User.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'userId'
    }
});




db.TBL_Order.belongsTo(db.TBL_ShippingAddress,{
    as:'shippingAddress',
    foreignKey:{
        name:'shippingAddressId'
    }
});
db.TBL_ShippingAddress.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'shippingAddressId'
    }
});




module.exports = db;