module.exports = (sequelize, Sequelize) => {
    const TBL_Supplier = sequelize.define("TBL_Supplier", {
        supplierId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(255),
            field: 'Name'
        },
        contact: {
            type: Sequelize.STRING(20),
            field: 'Contact'
        },
       
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Supplier.removeAttribute('id');
    return TBL_Supplier;
};