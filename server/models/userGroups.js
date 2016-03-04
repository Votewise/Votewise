module.exports = function(sequelize, DataTypes) {
    return sequelize.define('userGroups', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group: DataTypes.INTEGER,
        user: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};