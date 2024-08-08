module.exports = (sequelize, Sequelize) => {
    const TBL_Role = sequelize.define("TBL_Role", {
        roleId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        roleName: {
            type: Sequelize.STRING(255),
            field: 'RoleName'
        },
        description: {
            type: Sequelize.TEXT('long'),
            field: 'Description'
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Role.removeAttribute('id');
    return TBL_Role;

}