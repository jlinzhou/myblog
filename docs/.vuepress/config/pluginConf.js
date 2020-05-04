const moment = require('moment');
moment.locale("zh-cn")
const secret = require('./secret.js');
module.exports = {
    "vuepress-plugin-auto-sidebar": {},
    '@vuepress/last-updated':
    {
        transformer: (timestamp) => {
            return moment(timestamp).utcOffset(8).format("LLLL")
        }
    },
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "Refresh"
        }
    },
    '@vssue/vuepress-plugin-vssue': {
        // 设置 `platform` 而不是 `api`
        platform: 'github-v4',

        // 其他的 Vssue 配置
        owner: 'jlinzhou',
        repo: 'myblog',
        clientId: secret.clientId,
        clientSecret: secret.clientSecret,
        autoCreateIssue: true
    },
    '@vuepress/back-to-top': true,
    '@vuepress/google-analytics':
    {
        'ga': secret.ga // UA-00000000-0
    }
}