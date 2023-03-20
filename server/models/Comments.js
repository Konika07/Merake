module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define(
        "Comments", {
            messageBody: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    )

    return Comments; 
}