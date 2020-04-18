module.exports = {
    title: "一朝春诔",
    description: "一朝春诔的学习笔记",
    head: [
        ['link', { rel: 'icon', 'href': 'assets/img/favicon.ico' }],
        ['meta', { name: 'author', content: '一朝春诔' }],
        ['meta', { name: 'keywords', content: 'vuepress介绍，vuepress说明，一朝春诔' }],
    ],
    themeConfig: {
        logo: '/assets/img/logo.png',
        lastUpdated: '更新时间', // string | boolean
        nav: [
            {
                text: 'Languages',
                ariaLabel: 'Language Menu',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ]
            }
        ],
        sidebar: [
            '/',
            '/about',
            {
                title: '美丽的css',   // 必要的
                path: '/css/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    {
                        title: 's1',
                        path: '/css/s1',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/css/s1/c-aaa',
                            '/css/s1/c-bbb',
                            '/css/s1/c-ccc'
                        ]
                    },
                    {
                        title: 's2',
                        path: '/css/s2',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/css/s2/c-aaa',
                            '/css/s2/c-bbb',
                            '/css/s2/c-ccc'
                        ]
                    },
                    {
                        title: 's3',
                        path: '/css/s3',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/css/s3/c-aaa',
                            '/css/s3/c-bbb',
                            '/css/s3/c-ccc'
                        ]
                    }

                ]
            },
        ]
    }
}
// '/css/c-aaa',
// '/css/c-bbb',
// '/css/c-ccc'