module.exports = function(sequelize, DataTypes) {
    return sequelize.define('politicians', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        type: DataTypes.STRING,
        party: DataTypes.STRING,
        office: DataTypes.STRING,
        incumbent: DataTypes.BOOLEAN,
        website: DataTypes.STRING,
        endorsements: DataTypes.STRING,
        resume: DataTypes.BOOLEAN,
        statement: DataTypes.STRING,
        performanceReview: DataTypes.STRING,
        answerCount: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};