module.exports = function(sequelize, DataTypes) {
    return sequelize.define('backgrounds', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shortDescription: DataTypes.STRING,
        description: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};