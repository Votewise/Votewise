module.exports = function(sequelize, DataTypes) {
    return sequelize.define('rankingQuestionItems', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionId: DataTypes.STRING,
        item: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    });
};