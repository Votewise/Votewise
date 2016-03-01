module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RankingQuestionItems', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: DataTypes.STRING,
        item: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
};