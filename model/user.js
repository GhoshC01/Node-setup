module.exports = (sequelize, Sequelize) => {
    const TBL_User = sequelize.define("TBL_User", {
        userId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING(255),
            field: 'firstName',
        },
        lastName: {
            type: Sequelize.STRING(255),
            field: 'lastName',
        },
        emailAddress: {
            type: Sequelize.STRING(255),
            field: 'emailAddress',
        },
        password: {
            type: Sequelize.STRING(255),
            field: 'Password',
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_User.removeAttribute('id');
    return TBL_User;
};