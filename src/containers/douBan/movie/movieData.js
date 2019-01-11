export const movieData = {
    groups: [
        {
            type: "weekly",
            selected_collections: [
                {
                    id: "movie_weekly_best",
                    short_name: "口碑电影",
                    header_bg_image: "https://img3.doubanio.com/view/photo/photo/public/p2543795415.jpg",
                    items: [
                        {
                            title: "调琴师",
                            value: 8.6,
                            trend: true,
                        },
                        {
                            title: "四个春天",
                            value: 8.9,
                            trend: true,
                        },
                        {
                            title: "宠儿",
                            value: 7.5,
                            trend: true,
                        },
                    ]
                },

                {
                    id: "movie_hot_weekly",
                    short_name: "热门电影",
                    header_bg_image: "https://img3.doubanio.com/view/photo/photo/public/p2509612683.jpg",
                    items: [
                        {
                            title: "地球最后的夜晚",
                            value: 7,
                            trend: true,
                        },
                        {
                            title: "海王",
                            value: 7.8,
                            trend: true,
                        },
                        {
                            title: "来电狂响",
                            value: 6,
                            trend: false,
                        },
                    ]
                },

                {
                    id: "movie_top250",
                    short_name: "TOP250",
                    header_bg_image: "https://img3.doubanio.com/img/files/file-1543564940.png",
                    items: [
                        {
                            title: "肖申克的救赎",
                            value: 9.6,
                            trend: null,
                        },
                        {
                            title: "霸王别姬",
                            value: 9.6,
                            trend: null,
                        },
                        {
                            title: "这个杀手不太冷",
                            value: 9.4,
                            trend: null,
                        },
                    ]
                },
            ]
        },

        {
            type: "year",
            selected_collections: [
                {
                    type_text: '评分最高',
                    medium_name: '评分最高华语电影',
                    header_bg_image: "https://img3.doubanio.com/view/activity_page/m/public/p3190.jpg",
                },

                {
                    type_text: '评分最高',
                    medium_name: '评分最高外语电影',
                    header_bg_image: "https://img3.doubanio.com/view/activity_page/m/public/p3765.jpg",
                },

                {
                    type_text: '评分最高',
                    medium_name: '年度冷门佳片',
                    header_bg_image: "https://img3.doubanio.com/view/activity_page/m/public/p3722.jpg",
                },
            ]

        },

        {
            type: "film_genre",
            selected_collections: [
                {
                    short_name: '爱情片',
                    items: [
                        {
                            pic: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/p1910813120.jpg',
                            title: '霸王别姬',
                            value: 9.6,
                            star_count: 5
                        },
                        {
                            pic: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/p510861873.jpg',
                            title: '美丽人生',
                            value: 9.5,
                            star_count: 5
                        },
                        {
                            pic: 'https://img1.doubanio.com/view/photo/m_ratio_poster/public/p510876377.jpg',
                            title: '阿甘正传',
                            value: 9.4,
                            star_count: 5
                        },
                    ]
                },
                {
                    short_name: '喜剧片',
                    items: [
                        {
                            pic: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/p579729551.jpg',
                            title: '三傻大闹宝莱坞',
                            value: 9.2,
                            star_count: 5
                        },
                        {
                            pic: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/p2455050536.jpg',
                            title: '大话西游之大圣娶亲',
                            value: 9.2,
                            star_count: 5
                        },
                        {
                            pic: 'https://img3.doubanio.com/view/photo/m_ratio_poster/public/p1454261925.jpg',
                            title: '触不可及',
                            value: 9.2,
                            star_count: 5
                        },
                    ]
                },
            ]
        }
    ]
};