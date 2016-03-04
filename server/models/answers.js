var Backgrounds = require('./backgrounds');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('answers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: DataTypes.STRING,
        questionId: DataTypes.INTEGER,
        user: DataTypes.INTEGER,
        backgroundId: {
            type:DataTypes.INTEGER,
            references: {
                model: Backgrounds,
                key: 'id'
            }
        },
        importance: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        concurrence: DataTypes.INTEGER,
        answer: DataTypes.TEXT,
        lawSpirit: DataTypes.BOOLEAN,
        lawLetter: DataTypes.BOOLEAN,
        lawPrecedent: DataTypes.BOOLEAN,
        lawSocialNeed: DataTypes.BOOLEAN,
        previousComment: DataTypes.STRING,
        previousConcurrence: DataTypes.INTEGER,
        previousImportance: DataTypes.INTEGER,
        previousAnswer: DataTypes.TEXT,
        changeReason: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};




