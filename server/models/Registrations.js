module.exports = (sequelize, DataTypes) => {
    const Registrations = sequelize.define(
        "Registrations", {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            emailId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    )

    return Registrations;
}