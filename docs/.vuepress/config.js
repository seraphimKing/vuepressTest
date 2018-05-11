module.exports = {
    title: 'blog',
    description: 'Just attempt',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/'},
            { text: 'Guides', link: '/front/'},
            { text: 'Info', link: '/back/'}
        ],
        sidebar: [
            {
                title: '日常随笔',
                collapsable: true,
                children: [
                    '/'
                ]
            },
            {
                title: '前端小结',
                collapsable: true,
                children: [
                    '/front/',
                ]
            },
            {
                title: '后端小结',
                collapsable: true,
                children: [
                    '/back/',
                    '/back/info.md'
                ]
            }
        ]
    }
}