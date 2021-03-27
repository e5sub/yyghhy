/*
 * 酱茄小程序开源版 v1.3.5
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * License：MIT
 * Copyright ️ 2020 www.jiangqie.com All rights reserved.
 */

const Auth = require('./utils/auth.js');

App({

    appName: '嘤嘤怪后花园',

    onLaunch: function () {
        Auth.checkSession();
    },
    onLaunch() {
        wx.cloud.init({
          env: 'yyg-hhy',
          traceUser: true,
        })
        wx.getSystemInfo({
          success: (res) => {
            this.globalData.systeminfo = res
            this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
          },
        })
      },
      globalData: {
        // 是否保持常亮，离开小程序失效
        keepscreenon: false,
        systeminfo: {},
        isIPhoneX: false,
        key: '870d88aa89ad4ba19883c85651724306',
        weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
        requestUrl: {
          weather: 'https://free-api.heweather.com/s6/weather',
          hourly: 'https://free-api.heweather.com/s6/weather/hourly',
        },
      },
    
    })