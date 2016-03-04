var Backgrounds = require('./backgrounds');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('questions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: DataTypes.STRING,
        backgroundId: {
            type:DataTypes.INTEGER,
            references: {
                model: Backgrounds,
                key: 'id'
            }
        },
        description: DataTypes.STRING,
        viewOrder: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};