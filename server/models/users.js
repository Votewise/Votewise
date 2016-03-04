var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: DataTypes.STRING,
        passwordHash: {
            type: DataTypes.STRING,
            set: function(password){
                console.log('inside passwordhash set func');
                var hash = bcrypt.hashSync(password, 10);
                this.setDataValue('passwordHash', hash);
            }
        },
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        county: DataTypes.STRING,
        district: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        type: DataTypes.STRING,
        active: DataTypes.STRING,
        answerCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userLevel: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    }, {
        instanceMethods: {
            verifyPassword: function(password){
                console.log('inside verifyPassword');
                var hash = this.getDataValue('passwordHash');
                return bcrypt.compareSync(password, hash);
            }
        }
    });
};