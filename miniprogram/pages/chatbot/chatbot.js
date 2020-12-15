//logs.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
var plugin = requirePlugin("chatbot"); 
Page({
  data: {
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        let isIOS = res.system.indexOf("iOS") > -1;
        let navHeight = 0;
        if (!isIOS) {
          navHeight = 48;
        } else {
          navHeight = 44;
        }
        this.setData({
          status: res.statusBarHeight,
          navHeight: navHeight,
          statusBarHeight: res.statusBarHeight + navHeight
        })
      }
    })
    plugin.init({
      appid: "hOJg0q6HW1pODWA5u8IP2UWi8A2Qeu",
      openid: "oB6jg6ENstneouhXefbujwJl7v2n", // 小程序的openid
      // textToSpeech: true,
      guideList: [],
      welcome: '欢迎光临嘤嘤怪后花园，请问您需要什么帮助？',
      background: "#FFFFFF",
      // guideCardHeight: 20,
      operateCardHeight: 50,
      history: false,
      // historySize: 20,
      navHeight: 0,
      success: () => {
        this.setData({
          flag: true
        })
      },
      fail: error => {}
    });
  },
  getQueryCallback: function (e) {
   
  },
  goBackHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  back:function() {
    this.goBackHome()
  }
})
