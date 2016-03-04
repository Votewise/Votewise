module.exports = function(sequelize, DataTypes) {
    return sequelize.define('politicianLists', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: DataTypes.INTEGER,
        politician: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};