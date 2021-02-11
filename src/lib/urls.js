/**
 * url请求地址
 *
 */

const COMMON = {
    zhihu: 'https://news-at.zhihu.com/api/',
    douban: 'https://api.douban.com/',
};


export const URLS = {

    /**
     * 相关接口API：https://www.jianshu.com/p/42630373e1bc
     */

    /**
     * 知乎API文档：https://github.com/izzyleung/ZhihuDailyPurify/wiki/知乎日报-API-分析
     */

    hot: `${COMMON.zhihu}3/news/hot`,                           //热门消息
    latest: `${COMMON.zhihu}4/news/latest`,                     //最新消息
    news: `${COMMON.zhihu}4/news/`,                             //消息内容获取与离线下载
    before: `${COMMON.zhihu}4/news/before/`,                    //过往消息
    storyExtra: `${COMMON.zhihu}4/story-extra/`,                //新闻额外信息
    comments: `${COMMON.zhihu}4/story/`,                        //新闻对应评论查看
    sections: `${COMMON.zhihu}3/sections`,                      //栏目总览
    section: `${COMMON.zhihu}3/section/`,                       //栏目具体消息查看


    /**
     * 豆瓣电影API文档：https://www.jianshu.com/p/a7e51129b042
     */

    top250: `${COMMON.douban}v2/movie/top250`,                       //Top250
    subject: `${COMMON.douban}v2/movie/subject/`,                    //电影条目信息
    in_theaters: `${COMMON.douban}v2/movie/in_theaters`,             //正在热映
    coming_soon: `${COMMON.douban}v2/movie/coming_soon`,             //即将上映
    search: `${COMMON.douban}v2/movie/search`,                       //电影搜索
    weekly: `${COMMON.douban}v2/movie/weekly`,                       //口碑榜
    newMovies: `${COMMON.douban}v2/movie/new_movies`,                //新片榜

};
