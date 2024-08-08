module.exports=(sequelize,Sequelize)=>{
    const TBL_Product=sequelize.define('TBL_Product',{
        productId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            field: 'Name',
        },
        description: {
            type: Sequelize.TEXT('long'),
            field: 'Description',
        },
        category: {
            type: Sequelize.STRING(255),
            field: 'Category',
        },
        manufacturer: {
            type: Sequelize.STRING(255),
            field: 'Manufacturer',
        },
        price: {
            type: Sequelize.FLOAT,
            field: 'Price',
        },
        image: {
            type: Sequelize.TEXT('long'),
            field: 'Image',
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Product.removeAttribute('id');
    return TBL_Product;
}