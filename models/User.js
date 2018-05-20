module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.STRING, // 用户ID，允许从第三方登陆的用户指定一个新的UserId用来登陆，非强制
            allowNull: true
        },
        userType: {
            type: DataTypes.ENUM('0', '1', '2', '3'), // 0: 学生，1: 大V或老师，2: 运营, 3: 家长
            defaultValue: '0',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('0', '1'), // 0: 已注销，1: 正常用户
            defaultValue: '1',
            allowNull: false
        },
        sex: DataTypes.ENUM('male', 'female'),
        age: DataTypes.INTEGER,
        nickname: DataTypes.STRING, // 别名
        phone: DataTypes.STRING, // 手机号
        email: DataTypes.STRING, // 手机号
        avatar: DataTypes.STRING // 用户头像
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    // User.associate = (models) => {
    //     User.belongsToMany(models.Subject, {through: 'UserSubject'});
    //     User.belongsToMany(models.Category, {through: 'UserCategory'});
    //     User.belongsToMany(models.Role, {through: 'UserRole'});
    //     User.hasOne(models.UserAuth);
    // };

    return User;
};
