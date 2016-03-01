var Backgrounds = require('./backgrounds');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Answers', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: DataTypes.STRING,
        question: DataTypes.INTEGER,
        user: DataTypes.INTEGER,
        background: {
            type:DataTypes.INTEGER,
            references: {
                model: Backgrounds,
                key: 'background'
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




