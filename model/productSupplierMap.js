module.exports=(sequelize,Sequelize)=>{
    const TBL_ProductSupplierMap=sequelize.define("TBL_ProductSupplierMap",{
        mapId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        avail: {
            type: Sequelize.TINYINT,
            field: 'Avail'
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductSupplierMap.removeAttribute('id');
    return TBL_ProductSupplierMap;
}