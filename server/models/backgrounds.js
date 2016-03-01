module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Backgrounds', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        background: DataTypes.INTEGER,
        shortDescription: DataTypes.STRING,
        description: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createdBy: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        updatedBy: DataTypes.INTEGER
    });
};