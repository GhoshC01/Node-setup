module.exports = (sequelize, Sequelize) => {
    const TBL_Order = sequelize.define("TBL_Order", {
        orderId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        // orderPlaceDate: {
        //     type: Sequelize.DATE,
        //     field: 'orderPlaceDate',
        // },
        price: {
            type: Sequelize.FLOAT,
            field: 'Price'
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Order.removeAttribute('id');
    return TBL_Order;
};