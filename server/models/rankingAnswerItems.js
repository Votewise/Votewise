var Backgrounds = require('./backgrounds');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rankingansweritems', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: DataTypes.INTEGER,
        backgroundId: {
            type: DataTypes.INTEGER,
            references: {
                model: Backgrounds,
                key: 'id'
            }
        },
        questionId: DataTypes.STRING,
        answerId: DataTypes.INTEGER,
        itemId: DataTypes.INTEGER,
        item: DataTypes.INTEGER,
        rank: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
};