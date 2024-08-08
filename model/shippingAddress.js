module.exports = (sequelize, Sequelize) => {
    const TBL_ShippingAddress = sequelize.define("TBL_ShippingAddress", {
        shippingAddressId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        address: {
            type: Sequelize.TEXT('long'),
            field: 'address'
        },
        pinCode: {
            type: Sequelize.STRING(255),
            field: 'PinCode',
        },
        
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ShippingAddress.removeAttribute('id');
    return TBL_ShippingAddress;
};