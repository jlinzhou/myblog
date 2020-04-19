
const headConf = require('./config/headConf.js');
const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');
const sidebarConf = require('./config/sidebarConf.js');

module.exports = {
    // base: "/myblog",manifest icons generator
    title: "一朝春诔",
    description: "一朝春诔的学习笔记",
    head: headConf,
    plugins: pluginConf,
    themeConfig: {
        logo: '/assets/img/logo.png',
        lastUpdated: '更新时间', // string | boolean
        nav: navConf,
        sidebar: sidebarConf
    }
}
// '/css/c-aaa',
// '/css/c-bbb',
// '/css/c-ccc'