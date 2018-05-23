module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define('Test', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: 'un_id',
            comment: 'id comment',
            unique: true,
            primaryKey: true
        },
        // 如果未赋值,则自动设置值为 TRUE
        flag: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: 'flag comment'
        },

        // 设置默认时间为当前时间
        myDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            comment: 'my date comment',
        },

        // 将allowNull设置为false会将NOT NULL添加到列中， 这意味着当列为空时执行查询时将从DB抛出错误。
        // 如果要在查询DB之前检查值不为空，请查看下面的验证部分。
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        // 创建具有相同值的两个对象将抛出一个错误。 唯一属性可以是布尔值或字符串。 如果为多个列提供相同的字符串，则它们将形成复合唯一键。
        uniqueOne: {
            type: Sequelize.STRING,
            unique: 'compositeIndex'
        },
        uniqueTwo: {
            type: Sequelize.INTEGER,
            unique: 'compositeIndex'
        },

        // primaryKey用于定义主键。
        identifier: {
            type: Sequelize.STRING,
            isIn: {
                args: [
                    ['en', 'zh']
                ],
                msg: "Must be English or Chinese"
            }
        },

        // autoIncrement可用于创建自增的整数列
        incrementMe: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true
        },

        // 你可以通过'field'属性指定自定义字段名称：
        fieldWithUnderscores: {
            type: Sequelize.STRING(125),
            field: 'field_with_underscores',
            set(val) {
                this.setDataValue('fieldWithUnderscores', val.toUpperCase())
            }
        },

        // 这可以创建一个外键:
        bar_id: {
            type: Sequelize.UUID,

            references: {
                // 这是引用另一个模型
                model: 'User',

                // 这是引用模型的列名称
                key: 'id',

                // // 这声明什么时候检查外键约束。 仅限PostgreSQL。 deferrable:
                // Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },

        enumTest: {
            type: Sequelize.ENUM,
            values: ['0', '1']
        },

        enumTest1: {
            type: Sequelize.ENUM,
            values: [
                'active', 'pedding', 'delete'
            ],
            get() {
                var enumTest = this.getDataValue('enumTest');
                // 'this' allows you to access attributes of the instance
                return this.getDataValue('enumTest1') + ' (' + enumTest + ')';
            }
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        // 设置索引
        indexes: [
            {
                unique: true,
                fields: ['uniqueOne']
            }
        ],
        getterMethods: {
            fullName: function () {
                return this.enumTest + ' ' + this.enumTest1
            }
        },
        // 不要忘了启用 timestamps
        // 不启用时, createdAt和updatedAt均不显示, 下面的个性化配置无效
        timestamps: true,

        // 不想使用 createdAt
        createdAt: false,

        // 想 updatedAt 的实际名为 'updateTimestamp'
        updatedAt: 'updateTimestamp',

        // 要将 deletedAt 设置为 destroyTime (注意要启用paranoid)
        deletedAt: 'destroyTime',
        // 不删除数据库条目，但将新添加的属性deletedAt设置为当前日期（删除完成时）
        paranoid: true,
        // 整个表的注释, 这个注释有效, 可在table中显示出来
        comment: "I'm a table comment!"
    });
    return Test;
};
