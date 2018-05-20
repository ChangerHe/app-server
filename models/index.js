const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config').get('db');

// 当前的文件名
const basename = path.basename(module.filename);
// const env = process.env.NODE_ENV || 'development';
const db = {};
const sequelize = new Sequelize(config.get('DATABASE'), config.get('USERNAME'), config.get('PASSWORD'), config.get('sequelize'));

// 读取路径下的文件
fs.readdirSync(__dirname)
    // 过滤所有非index.js文件的所有js文件
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    // 循环
    .forEach(file => {
        console.log(__dirname, '__dirname111111111111111111111111111111111', file, 'file1111111111111111111111111111111111')
        // 引入这个数据模型
        const model = sequelize.import(path.join(__dirname, file));
        // 将模型名对应模型值挂载到db上
        console.log(model.name, 'model.name')
        db[model.name] = model;
    });

// 找到所有的db的key
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        // 外键关联
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(db.User , 'db111111111111111111111111')

module.exports = db;
