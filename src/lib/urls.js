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

       // * 全：https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&start=0&count=100&client=&udid=


    top250: `${COMMON.douban}v2/movie/top250`,                       //Top250
};


