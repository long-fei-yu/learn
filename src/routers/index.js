import {
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createSwitchNavigator
} from 'react-navigation';
import React from 'react';
import Color from '../lib/color';
import Dimen from '../lib/dimen';
import {NavBack} from '../components/header';
import TabNav from '../components/tabNav';
import TabBarNav from '../components/tabBarNav';

/**
 * 引导页
 */
import SplashContainer from '../containers/splash/splashContainer';

/**
 * 菜单页
 */
import MenusContainer from '../containers/menus/menusContainer';

/**
 * 知乎
 */

//日报
import DailyContainer from '../containers/zhiHu/daily/dailyContainer';
//日报详情
import DailyDetailContainer from '../containers/zhiHu/daily/dailyDetailContainer';
//评论
import DailyCommentContainer from '../containers/zhiHu/daily/dailyCommentContainer';

//主题
import ThemeContainer from '../containers/zhiHu/theme/themeContainer';

//专栏
import ColumnContainer from '../containers/zhiHu/column/columnContainer';
//专栏详情
import ColumnDetailContainer from '../containers/zhiHu/column/columnDetailContainer';

//热门
import PopularContainer from '../containers/zhiHu/popular/popularContainer';

/**
 * 豆瓣
 */

//首页
import HomeContainer from '../containers/douBan/home/homeContainer';

//电影
import MovieContainer from '../containers/douBan/movie/movieContainer';
//豆瓣Top250
import MovieTop250Container from '../containers/douBan/movie/movieTop250Container';


//电影详情
import MovieDetailsContainer from '../containers/douBan/movie/movieDetailsContainer';

//读书
import ReadContainer from '../containers/douBan/read/readContainer';

//我的
import MineContainer from '../containers/douBan/mine/mineContainer';

/**
 *GitHub
 */

import GitHubMainContainer from '../containers/gitHub/gitHubMainContainer';


/**
 * 设置
 */
import SettingContainer from '../containers/setting/settingContainer';

/**
 * 关于
 */

import AboutContainer from '../containers/about/aboutContainer';

/**
 * 加载网页
 */
import WebContainer from '../containers/web/webContainer';

/**
 * 知乎Stack
 */
const ZhiHuStack = createMaterialTopTabNavigator(
    {
        Daily: DailyContainer,
        Theme: ThemeContainer,
        Column: ColumnContainer,
        Popular: PopularContainer,
    },
    {
        initialRouteName: 'Daily',
        lazy: true,
        swipeEnabled: false,
        tabBarComponent: (props) => <TabBarNav {...props}/>,
    }
);

/**
 * 豆瓣Stack
 */
const DouBanStack = createBottomTabNavigator(
    {
        Home: HomeContainer,
        Movie: MovieContainer,
        Read: ReadContainer,
        Mine: MineContainer,
    },
    {
        initialRouteName: 'Home',
        lazy: true,
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                return <TabNav name={routeName} focused={focused}/>
            }
        }),
        tabBarOptions: {
            showLabel: false,
        },
    }
);


/**
 * GitHubStack
 */
const GitHubStack = createStackNavigator(
    {
        GitHubMain: {
            screen: GitHubMainContainer,
            navigationOptions: {
                header: null,
            },
        },
    },

    {
        initialRouteName: 'GitHubMain',
    }
);


/**
 * 主页面Stack 侧滑效果(抽屉)
 */
const MainStack = createDrawerNavigator(
    {
        Menu: MenusContainer,
        ZhiHu: ZhiHuStack,
        DouBan: DouBanStack,
        GitHub: GitHubStack,
        About: AboutContainer,
        Setting: SettingContainer,
    },
    {
        initialRouteName: 'ZhiHu',
        drawerWidth: deviceParameter.pw * 0.7,
        contentComponent: MenusContainer,
        backBehavior: 'initialRoute',
    }
);

/**
 * 主Stack
 */
const RootStack = createStackNavigator(
    {
        Splash: {
            screen: SplashContainer,
            navigationOptions: {
                header: null,
            },
        },
        Main: {
            screen: MainStack,
            navigationOptions: {
                header: null,
            },
        },
        DailyDetail: {
            screen: DailyDetailContainer,
            navigationOptions: ({navigation}) => (
                {
                    title: navigation.state.params && navigation.state.params.title,
                }
            ),
        },
        DailyComment: {
            screen: DailyCommentContainer,
            navigationOptions: {
                title: '评论',
            }
        },
        ColumnDetail: {
            screen: ColumnDetailContainer,
            navigationOptions: ({navigation}) => (
                {
                    title: navigation.state.params.title,
                }
            )
        },
        MovieTop250: {
            screen: MovieTop250Container,
        },
        MovieDetails: {
            screen: MovieDetailsContainer,
            navigationOptions: {
                title: '电影详情',
            }
        },

        Web: {
            screen: WebContainer,
            navigationOptions: {
                title: 'Web',
            }
        },

    },
    {
        initialRouteName: 'Splash',
        defaultNavigationOptions: ({navigation}) => ({
            headerLeft: (<NavBack navigation={navigation}/>),
            headerStyle: {
                backgroundColor: Color.cFFFFFF,
                height: 44,
            },
            headerTitleStyle: {
                fontSize: Dimen.s18,
                color: Color.c333333,
                fontWeight: 'normal',
            }
        })
    }
);


/**
 * 入口Stack
 */
const AppNavigator = createStackNavigator(
    {
        Root: RootStack,
    },
    {
        initialRouteName: 'Root',
        mode: 'modal',
        headerMode: 'none',
    }
);


export {AppNavigator};

