var Backgrounds = require('./backgrounds');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RankingAnswerItems', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: DataTypes.INTEGER,
        background: {
            type: DataTypes.INTEGER,
            references: {
                model: Backgrounds,
                key: 'background'
            }
        },
        question: DataTypes.STRING,
        answer: DataTypes.INTEGER,
        itemId: DataTypes.INTEGER,
        item: DataTypes.INTEGER,
        rank: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
};