const sequelizeFixtures = require('sequelize-fixtures');
const path = require('path');
const models = require('../models');

//会先drop db 慎用!
models.sequelize.sync({ force: true }).then(() => {
    console.log('sync ok!');
    // 插入默认数据
    sequelizeFixtures.loadFile(path.join(__dirname, './fixtures/*.js'), models).then(() => {
        console.info('insert auditType success!');
    }).catch(err => {
        console.error('insert auditType error', err);
    });
});
