/**
 * url请求地址
 *
 */

const COMMON = {
    zhihu: 'https://news-at.zhihu.com/api/',
};


export const URLS = {
    hot: `${COMMON.zhihu}3/news/hot`,                           //热门消息
    latest: `${COMMON.zhihu}4/news/latest`,                     //最新消息
    news: `${COMMON.zhihu}4/news/`,                             //消息内容获取与离线下载
    storyExtra: `${COMMON.zhihu}4/story-extra/`,                //新闻额外信息
    comments: `${COMMON.zhihu}4/story/`,                        //新闻对应评论查看
    sections: `${COMMON.zhihu}3/sections`,                      //栏目总览
    section: `${COMMON.zhihu}3/section/`,                       //栏目具体消息查看
};


