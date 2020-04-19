module.exports = [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/' },
    {
        text: '后端',
        // ariaLabel: 'Language Menu',
        items: [
            { text: 'golang', link: '/backend/golang/' },
            { text: 'python', link: '/backend/python/' },
            { text: 'c++', link: '/backend/cplus/' },
            { text: 'lua', link: '/backend/lua/' },
            { text: 'vba', link: '/backend/vba/' },
        ],

    },
    {
        text: '数据库',
        items: [
            { text: 'mysql', link: '/database/mysql/' },
            { text: 'mongodb', link: '/database/mongodb/' },
            { text: 'redis', link: '/database/redis/' },
            { text: 'etcd', link: '/database/etcd/' },
        ]
    },
    {
        text: '编程基础',
        ariaLabel: 'Language Menu',
        items: [
            { text: '算法与数据结构', link: '/programming/algo/' },
            { text: '设计模式', link: '/programming/pattern/' },
        ]
    },
    {
        text: '操作系统',
        items: [
            { text: 'windows', link: '/opersystem/windows/' },
            { text: 'linux', link: '/opersystem/linux/' },
        ]
    },
    {
        text: '开发工具',
        items: [
            { text: 'git', link: '/tool/git/' },
            { text: 'goland', link: '/tool/goland/' },
            { text: 'vscode', link: '/tool/vscode/' },
            { text: 'pycharm', link: '/tool/pycharm/' },
        ]
    },
    {
        text: '其他',
        items: [
            { text: 'nginx', link: '/other/nginx/' },
            { text: 'rabbitmq', link: '/other/rabbitmq/' },
            { text: 'docker', link: '/other/docker/' },
            { text: 'k8s', link: '/other/k8s/' },
            { text: '工作记录', link: '/other/workrecord/' },
            { text: '面试宝典', link: '/other/interview/' },
            { text: '其他', link: '/other/other/' },
        ]
    },
    {
        text: '前端',
        items: [
            { text: 'vue', link: '/frontend/vue/' },
        ]
    },
    { text: 'Github', link: 'https://github.com/jlinzhou', target: '_self', rel: '' },
]