

module.exports = [
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