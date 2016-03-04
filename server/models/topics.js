var Backgrounds = require('./backgrounds');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('topics', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        backgroundId: {
            type: DataTypes.INTEGER,
            references: {
                model: Backgrounds,
                key: 'id'
            }
        },
        parent: {
            type: DataTypes.INTEGER,
            references: {
                model: this,
                key: 'id'
            }
        },
        viewOrder: DataTypes.INTEGER,
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};