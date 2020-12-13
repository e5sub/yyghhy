/*
 * 酱茄小程序开源版 v1.2.2
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Constants = require('../../utils/constants');
const Api = require('../../utils/api.js');
const Rest = require('../../utils/rest');
const ht = require('../../utils/http.js');


Page({
    data: {
        logo: '',

        background: '',

        //顶部导航
        topNav: [{
            id: 0,
            name: '头条'
        }],
        currentTab: 0, //预设当前项的值

        //幻灯片
        slide: [],

        //图片导航
        iconNav: [],

        //热门文章
        hot: [],

        //热门tab
        postsLast: [],
        loaddingLast: false,
        pullUpOnLast: true,

        //其他tab
        posts: [],
        loadding: false,
        pullUpOn: true,

        //列表模式
        listMode: 3,
	    //天气数据
        weatherData: '',
        weatherImg: '',
    },

    onLoad: function (options) {
        let that = this;

        //获取配置
        Rest.get(Api.JIANGQIE_SETTING_HOME).then(res => {
            let logo = '../../images/logo.png';
            if (res.data.logo && res.data.logo.length > 0) {
                logo = res.data.logo;
            }
            that.setData({
                logo: logo,
                topNav: that.data.topNav.concat(res.data.top_nav),
                slide: res.data.slide,
                iconNav: res.data.icon_nav,
                actives: res.data.actives,
                hot: res.data.hot,
                listMode: res.data.list_mode,

                background: (res.data.slide && res.data.slide.length>0)?Api.JIANGQIE_BG_INDEX:'',
            });

            if (res.data.title && res.data.title.length > 0) {
                getApp().appName = res.data.title;
            }
        })

        //加载文章
        this.loadPostLast(true);
		//获取天气  
        this.getLocation()
    },
    /**
     * 获取天气
     * @param {*} e 
     */
    getWeather: function (e) {
        e.key = "7c316856bf5b5b621463589629531fed"
        ht.getAddress(e).then(list => {
            //console.log(list)
            e.adcode = list.data.regeocode.addressComponent.adcode
            e.extensions = 'base'
            ht.getWeather(e).then(weatherList => {
                //console.log(weatherList)
                var listData = weatherList.lives[0]
                var weatherData = listData.city + '\n' + listData.weather + listData.temperature + '℃' + '\n' + listData.winddirection + '风' + listData.windpower + '级';
                console.log(listData.weather)
                var imgpath = this.getImgpath(listData.weather)

                var weatherImg = '../../images/weather/' + imgpath + '.png'
                this.setData({
                    weatherData: weatherData,
                    weatherImg: weatherImg
                });
            })
        })

    },
    //循环天气
    getImgpath: function (e) {
        var i=''
        if (e == '晴') {
            i = 'qing'
        } else if (e = '多云') {
            i = 'duoyun'
        } else if (e = '暴雪') {
            i = 'baoxue'
        } else if (e = '暴雨') {
            i = 'baoyu'
        } else if (e = '大暴雨') {
            i = 'dabaoyu'
        } else if (e = '大雪') {
            i = 'daxue'
        }else if (e = '大雨') {
            i = 'dayu'
        }else if (e = '大雨-大暴雨') {
            i = 'dabaoyu'
        }else if (e = '雷阵雨') {
            i = 'leizhenyu'
        }else if (e = '晴间多云') {
            i = 'duoyun'
        }else if (e == '晴天') {
            i = 'qing'
        }else if (e == '沙尘暴') {
            i = 'shachenbao'
        }else if (e == '少云') {
            i = 'duoyun'
        }else if (e == '台风') {
            i = 'taifeng'
        }else if (e == '特大暴雨') {
            i = 'tedabaoyu'
        }else if (e == '雾天') {
            i = 'wutian'
        }else if (e == '小雪') {
            i = 'xiaoxue'
        }else if (e == '小雨') {
            i = 'xiaoyu'
        }else if (e == '小雨-中雨') {
            i = 'zhongyu'
        }else if (e == '扬尘') {
            i = 'yangchen'
        }else if (e == '阴') {
            i = 'yin'
        }else if (e == '阴天') {
            i = 'yin'
        }else if (e == '雨') {
            i = 'xiaoyu'
        }else if (e == '雨夹雪') {
            i = 'yujiaxue'
        }else if (e == '阵雪') {
            i = 'zhenxue'
        }else if (e == '阵雨') {
            i = 'zhenyu'
        }else if (e == '阵雨夹雪') {
            i = 'yujiaxue'
        }else if (e == '中雪') {
            i = 'zhongxue'
        }else if (e == '中雨') {
            i = 'zhongyu'
        }else if (e == '中雨-大雨') {
            i = 'dayu'
        }
        return i
    },
    //跳转到天气页面
    goWeather: function () {
        wx.navigateTo({
            url: '/pages/weather/weather',
        })
    },
    /**
     * 获取当前位置经纬度
     */
    getLocation: function () {
        var ts = this
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                var item = []
                item.lat = res.latitude
                item.lng = res.longitude
                //console.log(item) 
                ts.getWeather(item)
            },
            fail(err) {
                ts.getSet()
            }
        })
    },
    /**
     * 没有获取到地址位置，手动打开设置
     */
    getSet: function () {
        var ts = this
        wx.getSetting({
            success: (res) => {
                let authSeting = res.authSetting
                if (authSeting['scope.userLocation']) {

                } else {
                    wx.showModal({
                        cancelColor: 'cancelColor',
                        title: '您未开启地址位置授权',
                        success: res => {
                            if (res.confirm) {
                                wx.openSetting()
                            }
                        }
                    })
                }
            }
        })
    },
    onReachBottom: function () {
        if (this.data.currentTab == 0) {
            if (!this.data.pullUpOnLast) {
                return;
            }

            this.loadPostLast(false);
        } else {
            if (!this.data.pullUpOn) {
                return;
            }

            this.loadPost(false);
        }
    },

    onShareAppMessage: function () {
        return {
            title: getApp().appName,
            path: 'pages/index/index',
        }
    },

    onShareTimeline: function () {
        return {
            title: getApp().appName,
        }
    },

    //nav start----
    handlerSearchClick: function (e) {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    //nav end ----

    //slide start----
    handlerSlideChange: function (e) {
        this.setData({
            current: e.detail.current
        })
    },
    //slide end----

    //tab -- start
    swichNav: function (e) {
        let cur = e.currentTarget.dataset.current;
        if (this.data.currentTab == cur) {
            return false;
        }

        this.setData({
            background: (cur==0 && this.data.slide && this.data.slide.length>0)?Api.JIANGQIE_BG_INDEX:'',
            currentTab: cur
        })

        if (cur !== 0) {
            this.loadPost(true);
        }
    },

    handlerTabMoreClick: function (e) {
        wx.switchTab({
          url: '/pages/categories/categories',
        })
    },
    //tab -- end

    handlerIconNavClick: function(e) {
        let link = e.currentTarget.dataset.link;
        this.openLink(link);
    },

    handlerActiveClick: function(e) {
        let link = e.currentTarget.dataset.link;
        this.openLink(link);
    },

    handlerArticleClick: function (e) {
        let post_id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/article/article?post_id=' + post_id
        })
    },

    //加载数据
    loadPostLast: function (refresh) {
        let that = this;

        that.setData({
            loaddingLast: true
        });

        let offset = 0;
        if (!refresh) {
            offset = that.data.postsLast.length;
        }

        Rest.get(Api.JIANGQIE_POSTS_LAST, {
            'offset': offset
        }).then(res => {
            that.setData({
                loaddingLast: false,
                postsLast: refresh ? res.data : that.data.postsLast.concat(res.data),
                pullUpOnLast: res.data.length >= Constants.JQ_PER_PAGE_COUNT
            });
        })
    },

    loadPost: function (refresh) {
        let that = this;

        that.setData({
            loadding: true
        });

        let offset = 0;
        if (!refresh) {
            offset = that.data.posts.length;
        }

        Rest.get(Api.JIANGQIE_POSTS_CATEGORY, {
            'offset': offset,
            'cat_id': that.data.topNav[that.data.currentTab].id
        }).then(res => {
            that.setData({
                loadding: false,
                posts: refresh ? res.data : that.data.posts.concat(res.data),
                pullUpOn: res.data.length >= Constants.JQ_PER_PAGE_COUNT
            });
        })
    },

    openLink: function(link) {
        if(link.startsWith('/pages')) {
            wx.navigateTo({
              url: link,
            })
        } else {
            wx.navigateToMiniProgram({
                appId: link,
                fail: res => {
                    wx.showToast({
                      title: '无效链接',
                    })
                } 
            })
        }
    }
})